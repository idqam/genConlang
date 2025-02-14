"use client";

import React, { createContext, useContext, useState } from "react";

interface VowelHarmony {
  isEnabled: boolean;
  inputs: {
    front: string[];
    back: string[];
    neutral: string[];
  };
}

interface PhonoRulesContextProps {
  transformationRules: string;
  consonantClusters: string;
  vowelClusters: string;
  vowelHarmony: VowelHarmony;
  setTransformationRules: (rules: string) => void;
  setConsonantClusters: (clusters: string) => void;
  setVowelClusters: (clusters: string) => void;
  setVowelHarmony: (vh: VowelHarmony) => void;
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

  return (
    <PhonoRulesContext.Provider
      value={{
        transformationRules,
        consonantClusters,
        vowelClusters,
        vowelHarmony,
        setTransformationRules,
        setConsonantClusters,
        setVowelClusters,
        setVowelHarmony,
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
