/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface LanguageContextType {
  generatedLanguage: any;
  setGeneratedLanguage: (language: any) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [generatedLanguage, setGeneratedLanguage] = useState(null);

  return (
    <LanguageContext.Provider
      value={{ generatedLanguage, setGeneratedLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error(
      "useLanguageContext must be used within a LanguageProvider"
    );
  }
  return context;
};
