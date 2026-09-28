"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const TAB_ORDER = ["terminal", "wire", "markets", "account"];

interface Props {
  activeTab: string;
  children: React.ReactNode;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: "spring" as const, stiffness: 300, damping: 30 },
      opacity: { duration: 0.15 },
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    transition: {
      x: { type: "spring" as const, stiffness: 300, damping: 30 },
      opacity: { duration: 0.15 },
    },
  }),
};

export default function MobileTabContainer({ activeTab, children }: Props) {
  const currentIdx = TAB_ORDER.indexOf(activeTab);

  return (
    <div className="flex-1 relative w-full overflow-hidden lg:hidden">
      <AnimatePresence mode="wait" initial={false} custom={currentIdx}>
        <motion.div
          key={activeTab}
          custom={currentIdx}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 w-full h-full p-4 overflow-y-auto"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
