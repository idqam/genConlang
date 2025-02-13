"use client";
import React from "react";
import { motion } from "framer-motion";
import IPAButton from "../IpaButton";

interface IPAButtonGridProps {
  symbols: string[];
  header?: string;
}

// 1) Define container variants to control the stagger of child animations
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      // Stagger each child by 0.1s
      staggerChildren: 0.1,
    },
  },
};

// 2) Define item variants to describe the "stacked" hidden state
//    and how each button appears in its final position.
const itemVariants = {
  hidden: {
    // All items start in the same place (like a deck)
    x: 0,
    y: 0,
    opacity: 0,
    rotate: 0,
    scale: 0.8,
  },
  visible: {
    // Let the grid layout handle final positioning;
    // we just fade/scale them into place.
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

      {/*
        3) The parent motion.div uses containerVariants to
           stagger the animation of its children.
      */}
      <motion.div
        className="grid grid-cols-7 gap-2 p-2 rounded-lg bg-zinc-800 ml-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {symbols.map((symbol) => (
          // Wrap each IPAButton in a motion.div with the itemVariants.
          <motion.div key={symbol} variants={itemVariants}>
            <IPAButton symbol={symbol} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ButtonGridAnimated;
