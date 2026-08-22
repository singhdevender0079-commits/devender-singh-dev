import React, { Suspense, lazy, useEffect, useState } from "react";
import { Code2, Terminal } from "lucide-react";

const DeveloperScene = lazy(() => import("./three/DeveloperScene"));

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")),
    );
  } catch {
    return false;
  }
}

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
      {children}
    </div>
  );
}

function Skeleton() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-muted-foreground">
        <div className="size-10 animate-spin rounded-full border-2 border-border border-t-primary" />
        <p className="font-mono text-xs uppercase tracking-widest">Loading scene</p>
      </div>
    </div>
  );
}

/** Lightweight 2D fallback when WebGL is unavailable or the scene fails. */
function Fallback() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-8 text-center">
      <div className="flex size-24 items-center justify-center rounded-3xl border border-primary/40 bg-primary/10">
        <Terminal className="size-10 text-primary" aria-hidden="true" />
      </div>
      <div className="w-full max-w-xs space-y-2 text-left font-mono text-xs text-muted-foreground">
        <p>
          <span className="text-primary">const</span> dev = {"{"}
        </p>
        <p className="pl-4">name: &quot;Devender Singh&quot;,</p>
        <p className="pl-4">stack: [&quot;JS&quot;, &quot;Node&quot;, &quot;Mongo&quot;],</p>
        <p className="pl-4">
          building: <span className="text-accent">true</span>,
        </p>
        <p>{"}"};</p>
      </div>
      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        <Code2 className="size-4" aria-hidden="true" /> Interactive 3D scene unavailable
      </p>
    </div>
  );
}

class SceneBoundary extends React.Component<
  { children: React.ReactNode },
  { failed: boolean }
> {
  override state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  override render() {
    return this.state.failed ? <Fallback /> : this.props.children;
  }
}

export function CharacterStage() {
  const [ready, setReady] = useState(false);
  const [webgl, setWebgl] = useState(true);

  useEffect(() => {
    setWebgl(supportsWebGL());
    const idle = window.requestAnimationFrame(() => setReady(true));
    return () => window.cancelAnimationFrame(idle);
  }, []);

  return (
    <StageShell>
      {!webgl ? (
        <Fallback />
      ) : !ready ? (
        <Skeleton />
      ) : (
        <SceneBoundary>
          <Suspense fallback={<Skeleton />}>
            <DeveloperScene />
          </Suspense>
        </SceneBoundary>
      )}
    </StageShell>
  );
}
