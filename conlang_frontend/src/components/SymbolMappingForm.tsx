"use client";

import React, { useState } from "react";
import { useSymbolContext } from "@/app/context/SymbolContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const SymbolMappingForm: React.FC = () => {
  const {
    activeVowels,
    activeConsonants,
    inputMapToPhoneme,
    updateInputMapToPhoneme,
  } = useSymbolContext();

  const activeSymbols = [...activeVowels, ...activeConsonants];

  const [mappingLocked, setMappingLocked] = useState(false);

  if (activeSymbols.length === 0) {
    return null;
  }

  const handleSubmitMapping = () => {
    setMappingLocked(true);
  };

  return (
    <div className="p-4 border rounded-lg mt-4 mr-4">
      <div className="grid grid-cols-2 gap-2 p-2">
        {activeSymbols.map((symbol) => {
          const currentMapping = inputMapToPhoneme.get(symbol) || "";
          return (
            <div
              key={symbol}
              className="flex items-center space-x-4 p-2 border rounded"
            >
              <div className="w-10 text-center font-bold text-lg">{symbol}</div>
              <span className="font-bold">→</span>
              <div className="flex-1">
                <Label htmlFor={`mapping-${symbol}`} className="sr-only">
                  Mapping for {symbol}
                </Label>
                <Input
                  className="max-w-14"
                  id={`mapping-${symbol}`}
                  value={currentMapping}
                  onChange={(e) =>
                    updateInputMapToPhoneme(symbol, e.target.value)
                  }
                  disabled={mappingLocked}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4">
        {mappingLocked ? (
          <p className="text-green-600 font-semibold">Mapping locked in.</p>
        ) : (
          <Button onClick={handleSubmitMapping}>Submit Mapping</Button>
        )}
      </div>
    </div>
  );
};

export default SymbolMappingForm;
