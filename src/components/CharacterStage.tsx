import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import avatarAsset from "@/assets/avatar.png.asset.json";

export function CharacterStage() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0); // -0.5 .. 0.5
  const py = useMotionValue(0);

  const spring = { stiffness: 120, damping: 18, mass: 0.6 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);

  const rotateY = useTransform(sx, [-0.5, 0.5], [-18, 18]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [14, -14]);
  const avatarX = useTransform(sx, [-0.5, 0.5], [-18, 18]);
  const avatarY = useTransform(sy, [-0.5, 0.5], [-12, 12]);
  const glowX = useTransform(sx, [-0.5, 0.5], [-40, 40]);
  const glowY = useTransform(sy, [-0.5, 0.5], [-30, 30]);
  const shineX = useTransform(sx, [-0.5, 0.5], [20, 80]);
  const shineY = useTransform(sy, [-0.5, 0.5], [15, 70]);
  const shine = useMotionTemplate`radial-gradient(45% 45% at ${shineX}% ${shineY}%, color-mix(in oklab, var(--accent) 26%, transparent), transparent 70%)`;

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduced) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="relative w-full max-w-[520px] [perspective:1100px]"
    >
      <motion.div
        className="relative aspect-square w-full overflow-hidden rounded-[2rem] border border-border bg-card/40 [transform-style:preserve-3d] sm:aspect-[4/5] lg:aspect-square"
        style={reduced ? {} : { rotateX, rotateY }}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* depth layer: back glow */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            x: reduced ? 0 : glowX,
            y: reduced ? 0 : glowY,
            translateZ: -60,
            background:
              "radial-gradient(60% 55% at 50% 30%, color-mix(in oklab, var(--primary) 24%, transparent), transparent 70%)",
          }}
        />

        {/* grounding glow / floor shadow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 opacity-60"
          style={{
            transform: "translateZ(-30px)",
            background:
              "radial-gradient(50% 80% at 50% 100%, color-mix(in oklab, var(--primary) 30%, transparent), transparent 70%)",
          }}
        />

        {/* avatar, floating above the card plane */}
        <motion.img
          src={avatarAsset.url}
          alt="Devender Singh — developer avatar"
          className="relative z-10 mx-auto h-full w-full object-contain p-2 drop-shadow-[0_24px_45px_color-mix(in_oklab,var(--primary)_40%,transparent)]"
          style={reduced ? {} : { x: avatarX, y: avatarY, translateZ: 80 }}
          animate={reduced ? {} : { translateY: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          loading="eager"
          decoding="async"
        />

        {/* specular sheen that tracks the pointer */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 mix-blend-screen opacity-60"
          style={reduced ? {} : { background: shine, translateZ: 100 }}
        />
      </motion.div>
    </div>
  );
}
