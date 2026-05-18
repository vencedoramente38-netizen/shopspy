"use client";

import { memo, useCallback, useEffect, useRef } from "react";
import { motion, useAnimation, useMotionTemplate, useMotionValue, animate } from "framer-motion";
import { cn } from "../../lib/utils";

interface GlowingEffectProps {
  blur?: number;
  glow?: boolean;
  duration?: number;
  spread?: number;
  proximity?: number;
  disabled?: boolean;
  inactiveZone?: number;
  className?: string;
  variant?: "default" | "white";
}

export const GlowingEffect = memo(
  ({
    blur = 0,
    glow = true,
    duration = 2,
    spread = 20,
    proximity = 20,
    disabled = false,
    inactiveZone = 0,
    variant = "default",
    className,
  }: GlowingEffectProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const opacity = useAnimation();

    const handleMouseMove = useCallback(
      (e: MouseEvent) => {
        if (!containerRef.current) return;
        const { left, top, width, height } =
          containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);

        const isInside =
          e.clientX >= left &&
          e.clientX <= left + width &&
          e.clientY >= top &&
          e.clientY <= top + height;

        if (isInside && !disabled) {
          opacity.start({ opacity: 1 });
        } else {
          opacity.start({ opacity: 0 });
        }
      },
      [mouseX, mouseY, opacity, disabled]
    );

    useEffect(() => {
      window.addEventListener("mousemove", handleMouseMove);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, [handleMouseMove]);

    const maskImage = useMotionTemplate`radial-gradient(${spread}px circle at ${mouseX}px ${mouseY}px, white, transparent)`;

    return (
      <div
        ref={containerRef}
        className={cn(
          "pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300",
          !disabled && "group-hover:opacity-100",
          className
        )}
      >
        <motion.div
          className={cn(
            "absolute inset-0 rounded-[inherit] border-2",
            variant === "white" ? "border-white" : "border-[#ec1e54]"
          )}
          style={{
            maskImage,
            WebkitMaskImage: maskImage,
          }}
        />
        {glow && (
          <motion.div
            className={cn(
              "absolute inset-0 rounded-[inherit] blur-xl",
              variant === "white" ? "bg-white/20" : "bg-[#ec1e54]/20"
            )}
            style={{
              maskImage,
              WebkitMaskImage: maskImage,
            }}
          />
        )}
      </div>
    );
  }
);

GlowingEffect.displayName = "GlowingEffect";
