/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
} from "react";
import { SymbolContextType } from "../types/SymbolContextType";
import { IPA_VOWELS, IPA_CONSONANTS } from "../utils/constants";

interface SymbolProviderProps {
  children: ReactNode;
}

const SymbolContext = createContext<SymbolContextType | undefined>(undefined);

export const useSymbolContext = () => {
  const context = useContext(SymbolContext);
  if (!context) {
    throw new Error("useSymbolContext must be used within a SymbolProvider");
  }
  return context;
};

export const SymbolProvider: React.FC<SymbolProviderProps> = ({ children }) => {
  const [activeVowels, setActiveVowels] = useState<string[]>([]);
  const [activeConsonants, setActiveConsonants] = useState<string[]>([]);
  const [inputMapToPhoneme, setInputMapToPhoneme] = useState(new Map());

  const toggleSymbol = (symbol: string) => {
    if (IPA_VOWELS.includes(symbol)) {
      setActiveVowels((prev) =>
        prev.includes(symbol)
          ? prev.filter((v) => v !== symbol)
          : [...prev, symbol]
      );
    } else if (IPA_CONSONANTS.includes(symbol)) {
      setActiveConsonants((prev) =>
        prev.includes(symbol)
          ? prev.filter((c) => c !== symbol)
          : [...prev, symbol]
      );
    }
  };

  const isSymbolActive = (symbol: string) => {
    return activeVowels.includes(symbol) || activeConsonants.includes(symbol);
  };

  const updateInputMapToPhoneme = useCallback((key: any, value: any) => {
    setInputMapToPhoneme((prevMap) => {
      const newMap = new Map(prevMap);
      newMap.set(key, value);
      return newMap;
    });
  }, []);

  const value = {
    vowels: IPA_VOWELS,
    consonants: IPA_CONSONANTS,
    activeVowels,
    activeConsonants,
    toggleSymbol,
    isSymbolActive,
    inputMapToPhoneme,
    updateInputMapToPhoneme,
  };

  return (
    <SymbolContext.Provider value={value}>{children}</SymbolContext.Provider>
  );
};
