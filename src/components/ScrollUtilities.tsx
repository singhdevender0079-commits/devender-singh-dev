import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.3 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, backgroundImage: "var(--gradient-signal)" }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left"
    />
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="glass-panel fixed bottom-6 right-5 z-50 grid size-12 place-items-center rounded-2xl text-primary shadow-[var(--shadow-glow)] transition-transform duration-300 hover:-translate-y-1"
        >
          <ArrowUp className="size-5" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}

/** Subtle desktop-only cursor ring. Disabled for touch and reduced motion. */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    const ring = document.createElement("div");
    ring.setAttribute("aria-hidden", "true");
    ring.style.cssText = [
      "position:fixed",
      "top:0",
      "left:0",
      "width:26px",
      "height:26px",
      "border-radius:9999px",
      "border:1px solid color-mix(in oklab, var(--primary) 60%, transparent)",
      "pointer-events:none",
      "z-index:70",
      "transform:translate3d(-100px,-100px,0)",
      "transition:width .2s ease,height .2s ease,opacity .2s ease,background-color .2s ease",
      "opacity:0",
    ].join(";");
    document.body.appendChild(ring);

    let x = 0;
    let y = 0;
    let cx = 0;
    let cy = 0;
    let frame = 0;

    const onMove = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;
      ring.style.opacity = "1";
      const interactive = (event.target as HTMLElement | null)?.closest(
        "a,button,[role='tab'],input,textarea",
      );
      ring.style.width = interactive ? "42px" : "26px";
      ring.style.height = interactive ? "42px" : "26px";
      ring.style.backgroundColor = interactive
        ? "color-mix(in oklab, var(--primary) 14%, transparent)"
        : "transparent";
    };

    const loop = () => {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      const size = parseFloat(ring.style.width || "26");
      ring.style.transform = `translate3d(${cx - size / 2}px, ${cy - size / 2}px, 0)`;
      frame = window.requestAnimationFrame(loop);
    };

    const onLeave = () => {
      ring.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    frame = window.requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.cancelAnimationFrame(frame);
      ring.remove();
    };
  }, []);

  return enabled ? null : null;
}
