/**
 * Unique animated canvas backgrounds for each portfolio section.
 * Each variant is lightweight and distinct from the Hero particle network.
 */
import { useEffect, useRef } from "react";

type Props = { variant: "about" | "skills" | "experience" | "projects" | "contact" };

export const SectionBg = ({ variant }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    cancelAnimationFrame(rafRef.current);

    /* ── ABOUT: Floating concentric rings that pulse outward ── */
    if (variant === "about") {
      type Ring = { x: number; y: number; r: number; maxR: number; alpha: number; color: string; speed: number };
      const COLORS = ["#7c3aed", "#2563eb", "#06b6d4", "#a78bfa"];
      const rings: Ring[] = Array.from({ length: 18 }, () => ({
        x:     Math.random() * 1, y: Math.random() * 1,
        r:     Math.random() * 60 + 10,
        maxR:  Math.random() * 200 + 100,
        alpha: 0,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        speed: Math.random() * 0.4 + 0.2,
      }));
      rings.forEach((r, i) => { r.r = (i / rings.length) * r.maxR; });

      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        rings.forEach((r) => {
          r.r += r.speed;
          if (r.r > r.maxR) r.r = 0;
          const alpha = (1 - r.r / r.maxR) * 0.18;
          ctx.beginPath();
          ctx.arc(r.x * canvas.width, r.y * canvas.height, r.r, 0, Math.PI * 2);
          ctx.strokeStyle = r.color + Math.round(alpha * 255).toString(16).padStart(2, "0");
          ctx.lineWidth = 1;
          ctx.stroke();
        });
        rafRef.current = requestAnimationFrame(draw);
      };
      draw();
    }

    /* ── SKILLS: Matrix code-rain columns ── */
    if (variant === "skills") {
      const CHARS = "01アイウエオカキクケコ</>{}[]∑∆∏";
      const COL_W = 22;
      const cols  = Math.ceil(canvas.width / COL_W);
      const drops: number[] = Array.from({ length: cols }, () => Math.random() * -50);
      const COLORS_S = ["rgba(124,58,237,", "rgba(37,99,235,", "rgba(6,182,212,"];

      const draw = () => {
        ctx.fillStyle = "rgba(7,7,26,0.06)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drops.forEach((y, i) => {
          const char  = CHARS[Math.floor(Math.random() * CHARS.length)];
          const col   = COLORS_S[i % COLORS_S.length];
          const alpha = Math.random() * 0.25 + 0.05;
          ctx.fillStyle = col + alpha + ")";
          ctx.font = `${Math.random() > 0.98 ? "bold " : ""}12px "Fira Code", monospace`;
          ctx.fillText(char, i * COL_W, y * COL_W);
          drops[i] = y + 1;
          if (y * COL_W > canvas.height && Math.random() > 0.97) drops[i] = 0;
        });
        rafRef.current = requestAnimationFrame(draw);
      };
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      draw();
    }

    /* ── EXPERIENCE: Circuit-board flowing traces ── */
    if (variant === "experience") {
      type Trace = { pts: { x: number; y: number }[]; progress: number; speed: number; color: string; len: number };
      const COLORS_E = ["#7c3aed", "#2563eb", "#a78bfa", "#06b6d4"];

      const makeTrace = (): Trace => {
        const pts: { x: number; y: number }[] = [];
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        const segs = Math.floor(Math.random() * 5) + 3;
        pts.push({ x, y });
        for (let i = 0; i < segs; i++) {
          if (Math.random() > 0.5) { x += (Math.random() - 0.5) * 200; }
          else                     { y += (Math.random() - 0.5) * 160; }
          pts.push({ x, y });
        }
        return { pts, progress: 0, speed: Math.random() * 0.008 + 0.003, color: COLORS_E[Math.floor(Math.random() * COLORS_E.length)], len: 0.2 };
      };

      const traces: Trace[] = Array.from({ length: 22 }, makeTrace);

      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        traces.forEach((t) => {
          t.progress = (t.progress + t.speed) % 1;
          const total = t.pts.length - 1;
          const head  = t.progress;
          const tail  = Math.max(0, head - t.len);

          for (let seg = 0; seg < total; seg++) {
            const segStart = seg / total;
            const segEnd   = (seg + 1) / total;
            if (head < segStart || tail > segEnd) continue;

            const a  = t.pts[seg];
            const b  = t.pts[seg + 1];
            const s  = Math.max(0, (tail - segStart) / (segEnd - segStart));
            const e  = Math.min(1, (head - segStart) / (segEnd - segStart));
            const x1 = a.x + (b.x - a.x) * s;
            const y1 = a.y + (b.y - a.y) * s;
            const x2 = a.x + (b.x - a.x) * e;
            const y2 = a.y + (b.y - a.y) * e;

            const grad = ctx.createLinearGradient(x1, y1, x2, y2);
            grad.addColorStop(0, t.color + "00");
            grad.addColorStop(1, t.color + "88");
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.2;
            ctx.stroke();

            /* Dot at head */
            ctx.beginPath();
            ctx.arc(x2, y2, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = t.color + "cc";
            ctx.fill();
          }

          if (t.progress > 0.98) Object.assign(t, makeTrace());
        });
        rafRef.current = requestAnimationFrame(draw);
      };
      draw();
    }

    /* ── PROJECTS: Ripple grid wave ── */
    if (variant === "projects") {
      let t = 0;
      const GRID = 48;
      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        t += 0.018;
        const cols = Math.ceil(canvas.width  / GRID);
        const rows = Math.ceil(canvas.height / GRID);
        for (let r = 0; r <= rows; r++) {
          for (let c = 0; c <= cols; c++) {
            const cx = c * GRID;
            const cy = r * GRID;
            const dist = Math.sqrt((cx - canvas.width / 2) ** 2 + (cy - canvas.height / 2) ** 2);
            const wave = Math.sin(dist * 0.02 - t) * 0.5 + 0.5;
            const alpha = wave * 0.12;
            ctx.beginPath();
            ctx.arc(cx, cy, 1.5, 0, Math.PI * 2);
            const hue  = 240 + wave * 60;
            ctx.fillStyle = `hsla(${hue},70%,65%,${alpha})`;
            ctx.fill();
          }
        }
        rafRef.current = requestAnimationFrame(draw);
      };
      draw();
    }

    /* ── CONTACT: Radar/sonar sweep ── */
    if (variant === "contact") {
      let angle  = 0;
      const cx   = () => canvas.width  * 0.75;
      const cy   = () => canvas.height * 0.5;
      const maxR = () => Math.max(canvas.width, canvas.height) * 0.7;

      const blips: { x: number; y: number; alpha: number }[] = [];

      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const X = cx(); const Y = cy(); const R = maxR();

        /* Concentric rings */
        [0.25, 0.5, 0.75, 1].forEach((f) => {
          ctx.beginPath();
          ctx.arc(X, Y, R * f, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(124,58,237,0.07)";
          ctx.lineWidth = 1;
          ctx.stroke();
        });

        /* Sweep gradient */
        const sweep = (ctx as any).createConicGradient
          ? (ctx as any).createConicGradient(angle, X, Y)
          : null;

        if (!sweep) {
          /* Fallback — simple arc */
          ctx.beginPath();
          ctx.moveTo(X, Y);
          ctx.arc(X, Y, R, angle, angle + 0.5);
          ctx.fillStyle = "rgba(124,58,237,0.06)";
          ctx.fill();
        } else {
          sweep.addColorStop(0, "rgba(124,58,237,0.12)");
          sweep.addColorStop(0.15, "rgba(124,58,237,0.0)");
          sweep.addColorStop(1, "rgba(124,58,237,0.0)");
          ctx.beginPath();
          ctx.arc(X, Y, R, 0, Math.PI * 2);
          ctx.fillStyle = sweep;
          ctx.fill();
        }

        /* Sweep line */
        ctx.beginPath();
        ctx.moveTo(X, Y);
        ctx.lineTo(X + Math.cos(angle) * R, Y + Math.sin(angle) * R);
        ctx.strokeStyle = "rgba(124,58,237,0.35)";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        /* Random blip spawn */
        if (Math.random() > 0.97) {
          const a = angle;
          const r = Math.random() * R * 0.9 + R * 0.05;
          blips.push({ x: X + Math.cos(a) * r, y: Y + Math.sin(a) * r, alpha: 1 });
        }
        blips.forEach((b, i) => {
          b.alpha -= 0.008;
          ctx.beginPath();
          ctx.arc(b.x, b.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(6,182,212,${b.alpha * 0.7})`;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(b.x, b.y, 6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(6,182,212,${b.alpha * 0.2})`;
          ctx.fill();
          if (b.alpha <= 0) blips.splice(i, 1);
        });

        angle += 0.012;
        rafRef.current = requestAnimationFrame(draw);
      };
      draw();
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.85, zIndex: 0 }}
    />
  );
};
