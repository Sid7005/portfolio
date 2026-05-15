import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [visible,  setVisible]  = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  /* Dot — near-instant */
  const dotX = useSpring(mouseX, { stiffness: 3000, damping: 100 });
  const dotY = useSpring(mouseY, { stiffness: 3000, damping: 100 });

  /* Outer ring — springy lag */
  const ringX = useSpring(mouseX, { stiffness: 180, damping: 24 });
  const ringY = useSpring(mouseY, { stiffness: 180, damping: 24 });

  /* Ambient blob — very slow */
  const blobX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const blobY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);

      const el = e.target as Element;
      setHovering(
        !!el.closest('a, button, [role="button"], input, textarea, select, label, [data-cursor-pointer]')
      );
    };

    const onDown  = () => setClicking(true);
    const onUp    = () => setClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    /* Hide native cursor */
    document.body.style.cursor = "none";

    window.addEventListener("mousemove",    onMove,  { passive: true });
    window.addEventListener("mousedown",    onDown);
    window.addEventListener("mouseup",      onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove",    onMove);
      window.removeEventListener("mousedown",    onDown);
      window.removeEventListener("mouseup",      onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [mouseX, mouseY]);

  /* Don't render on touch devices */
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

  const ringSize  = hovering ? 48 : clicking ? 18 : 30;
  const ringAlpha = hovering ? "rgba(167,139,250,0.75)" : "rgba(124,58,237,0.45)";

  return (
    <>
      {/* ── Ambient glow blob ── */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9994]"
        style={{
          x: blobX, y: blobY,
          translateX: "-50%",
          translateY: "-50%",
          width:      80,
          height:     80,
          background: "radial-gradient(circle, rgba(124,58,237,0.18) 0%, rgba(6,182,212,0.08) 60%, transparent 80%)",
          filter:     "blur(8px)",
        }}
        animate={{
          opacity: visible ? 1 : 0,
          scale:   clicking ? 0.7 : hovering ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
      />

      {/* ── Outer ring ── */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9996]"
        style={{
          x: ringX, y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          borderStyle: "solid",
          borderColor: ringAlpha,
        }}
        animate={{
          width:           ringSize,
          height:          ringSize,
          opacity:         visible ? 1 : 0,
          borderWidth:     hovering ? 1.5 : 1,
          backgroundColor: hovering ? "rgba(124,58,237,0.07)" : "transparent",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
      />

      {/* ── Core dot ── */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9997]"
        style={{
          x: dotX, y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          background: "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)",
          boxShadow:  "0 0 8px rgba(124,58,237,0.9), 0 0 20px rgba(6,182,212,0.5)",
        }}
        animate={{
          width:   clicking ? 5  : hovering ? 10 : 7,
          height:  clicking ? 5  : hovering ? 10 : 7,
          opacity: visible  ? 1  : 0,
          scale:   clicking ? 0.6 : 1,
        }}
        transition={{ type: "spring", stiffness: 2000, damping: 60 }}
      />
    </>
  );
};

export default CustomCursor;
