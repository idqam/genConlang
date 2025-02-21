"use client";

import React, { useState } from "react";
import { useMapping } from "@/app/context/MappingContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useIpaSymbols } from "@/app/context/IpaSymbolContext";

const SymbolMappingForm: React.FC = () => {
  const { activeVowels, activeConsonants } = useIpaSymbols();
  const {
    updateInputMapToPhoneme,
    mappingLocked,
    lockMapping,
    unlockMapping,
    inputMapToPhoneme,
  } = useMapping();

  const activeSymbols = [...activeVowels, ...activeConsonants];

  const [localMapping, setLocalMapping] =
    useState<Record<string, string>>(inputMapToPhoneme);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (symbol: string, value: string) => {
    setLocalMapping((prev) => ({
      ...prev,
      [symbol]: value,
    }));
  };

  const handleSubmitMapping = () => {
    const missingMappings = activeSymbols.filter(
      (symbol) => !localMapping[symbol]?.trim()
    );

    if (missingMappings.length > 0) {
      setError("All symbols must have a corresponding input.");
      return;
    }

    setError(null);

    updateInputMapToPhoneme(localMapping);

    console.log("Updated Mapping:", localMapping);
    lockMapping();
  };

  if (activeSymbols.length === 0) {
    return null;
  }

  return (
    <div className="p-4 border rounded-lg mt-10 bg-zinc-800">
      <div className="grid grid-cols-2 gap-4 overflow-y-auto max-h-96 border rounded p-2">
        {activeSymbols.map((symbol) => (
          <div
            key={symbol}
            className="flex items-center space-x-2 p-2 max-h-10"
          >
            <div className="w-10 text-center font-bold text-sm md:text-lg">
              {symbol}
            </div>
            <span className="font-bold">→</span>
            <div className="flex-1">
              <Label htmlFor={`mapping-${symbol}`} className="sr-only">
                Mapping for {symbol}
              </Label>
              <Input
                className="max-w-14"
                id={`mapping-${symbol}`}
                value={localMapping[symbol] ?? ""}
                onChange={(e) => handleInputChange(symbol, e.target.value)}
                disabled={mappingLocked}
              />
            </div>
          </div>
        ))}
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}

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
