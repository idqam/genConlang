"use client";

import { useSymbolContext } from "@/app/context/SymbolContext";
import React from "react";

interface IPAButtonProps {
  symbol: string;
}

const IPAButton: React.FC<IPAButtonProps> = ({ symbol }) => {
  const { toggleSymbol, isSymbolActive } = useSymbolContext();

  return (
    <button
      onClick={() => toggleSymbol(symbol)}
      className={`
        w-9 h-9 rounded-md text-lg font-semibold
        transition-all duration-300 ease-in-out
        ${
          isSymbolActive(symbol)
            ? "bg-teal-600 text-white shadow-md transform scale-105"
            : "bg-white text-gray-700 hover:bg-teal-100"
        }
      `}
    >
      {symbol}
    </button>
  );
};

export default React.memo(IPAButton);
