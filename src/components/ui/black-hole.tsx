"use client";

import { useEffect, useRef } from "react";
import { createRenderer } from "./black-hole-utils/renderer";
import { cn } from "@/lib/utils";

export function BlackHole({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = createRenderer({ canvas });
    void renderer.ready;

    return () => renderer.dispose();
  }, []);

  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-background", className)}>
      {/* Fallback halo when WebGL is unavailable */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 size-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl"
        style={{ backgroundImage: "var(--gradient-halo)" }}
      />
      <canvas ref={canvasRef} className="relative h-full w-full" aria-hidden="true" />
    </div>
  );
}


export default BlackHole;
