import { useEffect, useRef, useState } from "react";
import { pdf, type DocumentProps } from "@react-pdf/renderer";
import React from "react";
import { ResumePDF, type ResumeData } from "@/components/ResumePDF";

async function toDataUrl(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch: ${url}`);
  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// Detect face bounds using the browser FaceDetector API (Chrome/Edge)
async function detectFaceBounds(
  img: HTMLImageElement,
): Promise<{ cx: number; cy: number; size: number } | null> {
  if (!("FaceDetector" in window)) return null;
  try {
    const fd = new (window as any).FaceDetector({ fastMode: false, maxDetectedFaces: 1 });
    const faces: Array<{ boundingBox: DOMRectReadOnly }> = await fd.detect(img);
    if (!faces.length) return null;
    const b = faces[0].boundingBox;
    // Add generous vertical padding so top of head isn't clipped
    const padV = b.height * 0.55;
    const padH = b.height * 0.45;
    const size = Math.round(b.height + padV + padH);
    const cx   = Math.round(b.x + b.width / 2);
    const cy   = Math.round(b.y + b.height / 2 - padV * 0.15); // slight upward shift for forehead
    return { cx, cy, size };
  } catch {
    return null;
  }
}

// Crop the image to a square centered on the detected face, or fall back to upper-center
async function cropToHead(dataUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = async () => {
      const face = await detectFaceBounds(img);

      let sx: number, sy: number, size: number;

      if (face) {
        // Use detected face center
        size = Math.min(face.size, img.width, img.height);
        sx = Math.round(face.cx - size / 2);
        sy = Math.round(face.cy - size / 2);
      } else {
        // Fallback: center square crop — mirrors CSS object-fit:cover;object-position:center
        size = Math.min(img.width, img.height);
        sx = Math.round((img.width - size) / 2);
        sy = Math.round((img.height - size) / 2);
      }

      // Clamp so we never go outside image bounds
      sx = Math.max(0, Math.min(sx, img.width  - size));
      sy = Math.max(0, Math.min(sy, img.height - size));

      const canvas = document.createElement("canvas");
      canvas.width  = size;
      canvas.height = size;
      canvas.getContext("2d")!.drawImage(img, sx, sy, size, size, 0, 0, size, size);
      resolve(canvas.toDataURL("image/jpeg", 0.92));
    };
    img.src = dataUrl;
  });
}

let cachedBlobUrl: string | null = null;
let generationPromise: Promise<string> | null = null;

export function clearResumeCache() {
  if (cachedBlobUrl) URL.revokeObjectURL(cachedBlobUrl);
  cachedBlobUrl = null;
  generationPromise = null;
}

async function generateResumeBlobUrl(): Promise<string> {
  if (cachedBlobUrl) return cachedBlobUrl;
  if (generationPromise) return generationPromise;

  generationPromise = (async () => {
    const res = await fetch("/api/content");
    if (!res.ok) throw new Error("Failed to fetch portfolio data");
    const data: ResumeData = await res.json();

    const rawPath = data.hero.heroImage;
    const photoAbsUrl = rawPath?.startsWith("http")
      ? rawPath
      : `${window.location.origin}${rawPath ?? ""}`;

    let croppedPhoto = "";
    try {
      const photoDataUrl = await toDataUrl(photoAbsUrl);
      croppedPhoto = await cropToHead(photoDataUrl);
    } catch (imgErr) {
      console.warn("Resume: could not load hero image, generating without photo:", imgErr);
    }

    const element = React.createElement(ResumePDF, {
      data,
      photoUrl: croppedPhoto,
    }) as React.ReactElement<DocumentProps>;

    const blob = await pdf(element).toBlob();
    const url = URL.createObjectURL(blob);
    cachedBlobUrl = url;
    return url;
  })();

  try {
    return await generationPromise;
  } finally {
    generationPromise = null;
  }
}

const FALLBACK_RESUME_URL = "/resume";

function triggerDownload(url: string, filename: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export function useResumeDownload() {
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const blobUrlRef = useRef<string | null>(cachedBlobUrl);

  // Pre-generate in background as soon as this hook mounts
  useEffect(() => {
    if (cachedBlobUrl) { setReady(true); return; }
    generateResumeBlobUrl()
      .then((url) => { blobUrlRef.current = url; setReady(true); })
      .catch((err) => {
        console.error("Resume pre-generation failed:", err);
        setUseFallback(true);
        setReady(true); // unblock the button so user can still download
      });
  }, []);

  async function downloadResume() {
    if (loading) return;

    // If pre-generation failed, fall back to the server-side /resume endpoint
    if (useFallback) {
      triggerDownload(FALLBACK_RESUME_URL, "Siddharajsinh_Chauhan_Resume.pdf");
      return;
    }

    setLoading(true);
    try {
      const url = blobUrlRef.current ?? await generateResumeBlobUrl();
      blobUrlRef.current = url;
      triggerDownload(url, "Siddharajsinh_Chauhan_Resume.pdf");
    } catch (err) {
      console.error("Resume download failed:", err);
      // Fall back to server-side PDF rather than showing an error
      setUseFallback(true);
      triggerDownload(FALLBACK_RESUME_URL, "Siddharajsinh_Chauhan_Resume.pdf");
    } finally {
      setLoading(false);
    }
  }

  return { downloadResume, loading: loading || !ready, ready };
}
