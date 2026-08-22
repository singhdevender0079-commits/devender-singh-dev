import { motion, useReducedMotion } from "framer-motion";
import { Code2 } from "lucide-react";
import avatarAsset from "@/assets/avatar.png.asset.json";

function StageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative aspect-square w-full max-w-[520px] overflow-hidden rounded-[2rem] border border-border bg-card/40 sm:aspect-[4/5] lg:aspect-square">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 30%, color-mix(in oklab, var(--primary) 22%, transparent), transparent 70%)",
        }}
      />
      {/* grounding glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 opacity-60"
        style={{
          background:
            "radial-gradient(50% 80% at 50% 100%, color-mix(in oklab, var(--primary) 30%, transparent), transparent 70%)",
        }}
      />
      {children}
    </div>
  );
}

export function CharacterStage() {
  const reduced = useReducedMotion();
  return (
    <StageShell>
      <motion.img
        src={avatarAsset.url}
        alt="Devender Singh — developer avatar"
        className="relative z-10 mx-auto h-full w-full object-contain p-2 drop-shadow-[0_18px_40px_color-mix(in_oklab,var(--primary)_35%,transparent)]"
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        loading="eager"
        decoding="async"
      />
      {/* subtle idle float, layered via inner wrapper to keep entrance animation clean */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 flex items-end justify-center pb-6"
        animate={reduced ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Code2 className="size-4 text-primary/40" />
      </motion.div>
    </StageShell>
  );
}
