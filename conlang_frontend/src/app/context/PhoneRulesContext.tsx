"use client";

import React, { createContext, useContext, useState } from "react";
import { VowelHarmony } from "../types/SpecPayload";

interface PhonoRulesContextProps {
  transformationRules: string;
  consonantClusters: string;
  vowelClusters: string;
  vowelHarmony: VowelHarmony;
  allowedSyllables: string[];
  allowedConsonants: string[];
  setTransformationRules: (rules: string) => void;
  setConsonantClusters: (clusters: string) => void;
  setVowelClusters: (clusters: string) => void;
  setVowelHarmony: (vh: VowelHarmony) => void;
  setAllowedSyllables: (syllables: string[]) => void;
  setAllowedConsonants: (consonants: string[]) => void;
}

const PhonoRulesContext = createContext<PhonoRulesContextProps | undefined>(
  undefined
);

export const PhonoRulesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [transformationRules, setTransformationRules] = useState("");
  const [consonantClusters, setConsonantClusters] = useState("");
  const [vowelClusters, setVowelClusters] = useState("");
  const [vowelHarmony, setVowelHarmony] = useState<VowelHarmony>({
    isEnabled: false,
    inputs: { front: [], back: [], neutral: [] },
  });
  const [allowedSyllables, setAllowedSyllables] = useState<string[]>([]);
  const [allowedConsonants, setAllowedConsonants] = useState<string[]>([]);

  return (
    <PhonoRulesContext.Provider
      value={{
        transformationRules,
        consonantClusters,
        vowelClusters,
        vowelHarmony,
        allowedSyllables,
        allowedConsonants,
        setTransformationRules,
        setConsonantClusters,
        setVowelClusters,
        setVowelHarmony,
        setAllowedSyllables,
        setAllowedConsonants,
      }}
    >
      {children}
    </PhonoRulesContext.Provider>
  );
};

export const usePhonoRules = () => {
  const context = useContext(PhonoRulesContext);
  if (!context) {
    throw new Error("usePhonoRules must be used within a PhonoRulesProvider");
  }
  return context;
};
