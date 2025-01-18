"use client";
import React from "react";
import IPAButton from "./IpaButton";

interface IPAButtonGridProps {
  symbols: string[];
  header: string;
}

const IpaButtonGrid: React.FC<IPAButtonGridProps> = ({ symbols, header }) => (
  <div className="flex flex-col items-center space-y-4">
    <h2 className="text-xl font-semibold mb-2 text-center border-solid border-2 rounded-lg bg-blue-300 px-4 py-1">
      {header}
    </h2>
    <div className="grid grid-cols-7 gap-2 p-4  rounded-lg bg-black">
      {symbols.map((symbol) => (
        <IPAButton key={symbol} symbol={symbol} />
      ))}
    </div>
  </div>
);

export default IpaButtonGrid;
