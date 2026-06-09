"use client";

import { motion } from "framer-motion";

export default function LuxuryBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      <motion.div
        animate={{
          x: [0, 120, 0],
          y: [0, -120, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
        }}
        className="absolute top-10 left-10 w-80 h-80 rounded-full bg-yellow-500/10 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -150, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
        }}
        className="absolute bottom-20 right-10 w-[500px] h-[500px] rounded-full bg-black/5 blur-3xl"
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="absolute top-1/2 left-1/2 w-72 h-72 rounded-full bg-yellow-400/10 blur-3xl"
      />

    </div>
  );
}