"use client";
import React from "react";
import IPAButton from "./IpaButton";

interface IPAButtonGridProps {
  symbols: string[];
  header?: string;
}

const IpaButtonGrid: React.FC<IPAButtonGridProps> = ({ symbols, header }) => (
  <div className="space-y-2">
    <h2 className="text-center  text-bold text-lg text-gray-800">{header}</h2>

    <div className="grid grid-cols-7 gap-2 p-2 rounded-lg bg-zinc-800 ml-2">
      {symbols.map((symbol) => (
        <IPAButton key={symbol} symbol={symbol} />
      ))}
    </div>
  </div>
);

export default IpaButtonGrid;
