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
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
    </div>
  );
}

export default BlackHole;
