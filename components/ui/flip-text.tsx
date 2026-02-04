"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

interface FlipTextProps {
  word: string;
  duration?: number;
  delayMultiple?: number;
  framerProps?: Variants;
  className?: string;
  containerClassName?: string;
}

function FlipText({
  word,
  duration = 0.5,
  delayMultiple = 0.08,
  framerProps = {
    hidden: { rotateX: -90, opacity: 0 },
    visible: { rotateX: 0, opacity: 1 },
  },
  className,
  containerClassName,
}: FlipTextProps) {
  return (
    <span
      className={cn(
        "inline-flex flex-wrap justify-center gap-x-1 gap-y-0 md:justify-start",
        containerClassName
      )}
      style={{ perspective: "1000px" }}
    >
      <AnimatePresence mode="wait">
        {word.split("").map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={framerProps}
            transition={{ duration, delay: i * delayMultiple }}
            className={cn("inline-block origin-center drop-shadow-sm", className)}
            style={{ backfaceVisibility: "hidden", transformStyle: "preserve-3d" }}
          >
            {char}
          </motion.span>
        ))}
      </AnimatePresence>
    </span>
  );
}

export { FlipText };
