"use client";

import React, { useState } from "react";
import { useMapping } from "@/app/context/MappingContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useIpaSymbols } from "@/app/context/IpaSymbolContext";

const SymbolMappingForm: React.FC = () => {
  const { activeVowels, activeConsonants } = useIpaSymbols();
  const { updateInputMapToPhoneme, mappingLocked, lockMapping, unlockMapping } =
    useMapping();

  const activeSymbols = [...activeVowels, ...activeConsonants];

  const [localMapping, setLocalMapping] = useState<Record<string, string>>({});

  const handleInputChange = (symbol: string, value: string) => {
    setLocalMapping((prev) => ({ ...prev, [symbol]: value }));
  };

  const handleSubmitMapping = () => {
    activeSymbols.forEach((symbol) => {
      const mappingValue = localMapping[symbol] || "";
      updateInputMapToPhoneme(symbol, mappingValue);
    });
    lockMapping();
  };

  if (activeSymbols.length === 0) {
    return null;
  }

  return (
    <div className="p-4 border rounded-lg mt-4 bg-zinc-800">
      <div className="grid grid-cols-2 gap-4 overflow-y-auto max-h-96 border rounded p-2">
        {activeSymbols.map((symbol) => {
          const currentValue = localMapping[symbol] ?? "";
          return (
            <div
              key={symbol}
              className="flex items-center space-x-2 p-2  max-h-10"
            >
              <div className="w-10 text-center font-bold text-sm">{symbol}</div>
              <span className="font-bold">→</span>
              <div className="flex-1">
                <Label htmlFor={`mapping-${symbol}`} className="sr-only">
                  Mapping for {symbol}
                </Label>
                <Input
                  className="max-w-14"
                  id={`mapping-${symbol}`}
                  value={currentValue}
                  onChange={(e) => handleInputChange(symbol, e.target.value)}
                  disabled={mappingLocked}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4">
        {mappingLocked ? (
          <div className="flex items-center space-x-4">
            <p className="text-green-600 font-semibold">Mapping locked in.</p>
            <Button onClick={unlockMapping}>Edit Mapping</Button>
          </div>
        ) : (
          <Button onClick={handleSubmitMapping}>Submit Mapping</Button>
        )}
      </div>
    </div>
  );
};

export default SymbolMappingForm;
