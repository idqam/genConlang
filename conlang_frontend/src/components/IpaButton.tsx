"use client";
import { useSymbolContext } from "@/app/context/SymbolContext";
import React from "react";

interface IPAButtonProps {
  symbol: string;
  className?: string;
}

const IPAButton: React.FC<IPAButtonProps> = ({ symbol }) => {
  const { toggleSymbol, isSymbolActive } = useSymbolContext();

  return (
    <button
      onClick={() => toggleSymbol(symbol)}
      className={`
        w-10 h-10 m-1 rounded text-lg font-semibold
        transition-all duration-300 ease-in-out
        ${
          isSymbolActive(symbol)
            ? "bg-teal-800 text-white shadow-lg bg-[length:200%_200%]"
            : "bg-gray-200 text-gray-700 hover:bg-red-300"
        }
      `}
    >
      {symbol}
    </button>
  );
};

export default IPAButton;
