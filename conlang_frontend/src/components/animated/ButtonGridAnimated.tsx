"use client";
import React from "react";
import { motion } from "framer-motion";
import IPAButton from "../IpaButton";

interface IPAButtonGridProps {
  symbols: string[];
  header?: string;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    x: 0,
    y: 0,
    opacity: 0,
    rotate: 0,
    scale: 0.8,
  },
  visible: {
    x: 0,
    y: 0,
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

const ButtonGridAnimated: React.FC<IPAButtonGridProps> = ({
  symbols,
  header,
}) => {
  return (
    <div className="space-y-2">
      {header && (
        <h2 className="text-center text-bold text-lg text-gray-800">
          {header}
        </h2>
      )}

      <motion.div
        className="grid grid-cols-7 gap-2 p-2 rounded-lg bg-zinc-800 ml-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {symbols.map((symbol) => (
          <motion.div key={symbol} variants={itemVariants}>
            <IPAButton symbol={symbol} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ButtonGridAnimated;
