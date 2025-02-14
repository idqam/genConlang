"use client";

import React, { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useIpaSymbols } from "@/app/context/IpaSymbolContext";
import { usePhonoRules } from "@/app/context/PhoneRulesContext";

type IPAField = "front" | "back" | "neutral";

export function IpaSwitchComponent() {
  const [isVowelHarmonyEnabled, setIsVowelHarmonyEnabled] = useState(false);
  const { activeVowels } = useIpaSymbols();

  const [activeField, setActiveField] = useState<IPAField | null>(null);

  const [inputs, setInputs] = useState<{
    front: string[];
    back: string[];
    neutral: string[];
  }>({
    front: [],
    back: [],
    neutral: [],
  });

  const { setVowelHarmony } = usePhonoRules();

  useEffect(() => {
    setVowelHarmony({
      isEnabled: isVowelHarmonyEnabled,
      inputs,
    });
  }, [isVowelHarmonyEnabled, inputs, setVowelHarmony]);

  const handleSwitchChange = (value: boolean) => {
    setIsVowelHarmonyEnabled(value);
    if (!value) {
      setActiveField(null);
    }
  };

  const handleVowelClick = (vowel: string) => {
    if (!activeField) return;
    const isUsed = Object.values(inputs).some((arr) => arr.includes(vowel));
    if (isUsed) return;
    setInputs((prev) => ({
      ...prev,
      [activeField]: [...prev[activeField], vowel],
    }));
  };

  const handleInputChange = (field: IPAField, value: string) => {
    let newArr = Array.from(new Set(value.split("")));
    const otherFields = (["front", "back", "neutral"] as IPAField[]).filter(
      (f) => f !== field
    );
    const otherSymbols = new Set<string>();
    otherFields.forEach((f) => {
      inputs[f].forEach((s) => otherSymbols.add(s));
    });
    newArr = newArr.filter((symbol) => !otherSymbols.has(symbol));
    setInputs((prev) => ({
      ...prev,
      [field]: newArr,
    }));
  };

  const renderPalette = () => {
    if (!activeField) return null;
    return (
      <Card className="mt-10 w-64 bg-white text-black p-4 shadow-lg z-10">
        <CardHeader>
          <CardTitle>
            Insert IPA symbol into &quot;{activeField}&quot; field
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-2">
            {activeVowels.map((vowel) => (
              <Button
                type="button"
                key={vowel}
                variant="secondary"
                onClick={() => handleVowelClick(vowel)}
              >
                {vowel}
              </Button>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            className="mt-4 w-full"
            onClick={() => setActiveField(null)}
          >
            Close Palette
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="relative text-white p-6"
    >
      <div className="flex items-center mb-6 space-x-2">
        <Label htmlFor="vowel-harmony" className="cursor-pointer">
          Enable Vowel Harmony?
        </Label>
        <Switch
          id="vowel-harmony"
          checked={isVowelHarmonyEnabled}
          onCheckedChange={handleSwitchChange}
        />
      </div>

      {isVowelHarmonyEnabled && (
        <div className="flex gap-4">
          <div className="flex flex-col">
            <Label className="mb-2" htmlFor="front">
              Front
            </Label>
            <Input
              id="front"
              value={inputs.front.join("")}
              onChange={(e) => handleInputChange("front", e.target.value)}
              onClick={() => setActiveField("front")}
            />
          </div>
          <div className="flex flex-col">
            <Label className="mb-2" htmlFor="back">
              Back
            </Label>
            <Input
              id="back"
              value={inputs.back.join("")}
              onChange={(e) => handleInputChange("back", e.target.value)}
              onClick={() => setActiveField("back")}
            />
          </div>
          <div className="flex flex-col">
            <Label className="mb-2" htmlFor="neutral">
              Neutral
            </Label>
            <Input
              id="neutral"
              value={inputs.neutral.join("")}
              onChange={(e) => handleInputChange("neutral", e.target.value)}
              onClick={() => setActiveField("neutral")}
            />
          </div>
        </div>
      )}

      {renderPalette()}
    </form>
  );
}
