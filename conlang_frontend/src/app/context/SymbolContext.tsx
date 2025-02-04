/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  ReactNode,
} from "react";
import { IPA_VOWELS, IPA_CONSONANTS } from "../utils/constants";
import { SymbolContextType } from "../types/SymbolContextType";

interface SymbolProviderProps {
  children: ReactNode;
}

interface SymbolState {
  activeVowels: string[];
  activeConsonants: string[];
  inputMapToPhoneme: Map<string, string>;
  mappingLocked: boolean;
}

type SymbolAction =
  | { type: "TOGGLE_SYMBOL"; symbol: string }
  | { type: "UPDATE_MAPPING"; key: string; value: string }
  | { type: "LOCK_MAPPING" }
  | { type: "UNLOCK_MAPPING" };

const initialState: SymbolState = {
  activeVowels: [],
  activeConsonants: [],
  inputMapToPhoneme: new Map<string, string>(),
  mappingLocked: false,
};

function symbolReducer(state: SymbolState, action: SymbolAction): SymbolState {
  switch (action.type) {
    case "TOGGLE_SYMBOL": {
      if (state.mappingLocked) return state;
      const symbol = action.symbol;
      if (IPA_VOWELS.includes(symbol)) {
        const activeVowels = state.activeVowels.includes(symbol)
          ? state.activeVowels.filter((v) => v !== symbol)
          : [...state.activeVowels, symbol];
        return { ...state, activeVowels };
      } else if (IPA_CONSONANTS.includes(symbol)) {
        const activeConsonants = state.activeConsonants.includes(symbol)
          ? state.activeConsonants.filter((c) => c !== symbol)
          : [...state.activeConsonants, symbol];
        return { ...state, activeConsonants };
      }
      return state;
    }
    case "UPDATE_MAPPING": {
      const newMap = new Map(state.inputMapToPhoneme);
      newMap.set(action.key, action.value);
      return { ...state, inputMapToPhoneme: newMap };
    }
    case "LOCK_MAPPING": {
      return { ...state, mappingLocked: true };
    }
    case "UNLOCK_MAPPING": {
      return { ...state, mappingLocked: false };
    }
    default:
      return state;
  }
}

const SymbolContext = createContext<SymbolContextType | undefined>(undefined);

export const useSymbolContext = (): SymbolContextType => {
  const context = useContext(SymbolContext);
  if (!context) {
    throw new Error("useSymbolContext must be used within a SymbolProvider");
  }
  return context;
};

export const SymbolProvider: React.FC<SymbolProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(symbolReducer, initialState);

  const toggleSymbol = (symbol: string) => {
    dispatch({ type: "TOGGLE_SYMBOL", symbol });
  };

  const isSymbolActive = (symbol: string): boolean =>
    state.activeVowels.includes(symbol) ||
    state.activeConsonants.includes(symbol);

  const updateInputMapToPhoneme = (key: string, value: string) => {
    dispatch({ type: "UPDATE_MAPPING", key, value });
  };

  const lockMapping = () => {
    dispatch({ type: "LOCK_MAPPING" });
  };

  const unlockMapping = () => {
    dispatch({ type: "UNLOCK_MAPPING" });
  };

  const value = useMemo<SymbolContextType>(
    () => ({
      vowels: IPA_VOWELS,
      consonants: IPA_CONSONANTS,
      activeVowels: state.activeVowels,
      activeConsonants: state.activeConsonants,
      toggleSymbol,
      isSymbolActive,
      inputMapToPhoneme: state.inputMapToPhoneme,
      updateInputMapToPhoneme,
      mappingLocked: state.mappingLocked,
      lockMapping,
      unlockMapping,
    }),
    [
      state.activeVowels,
      state.activeConsonants,
      state.inputMapToPhoneme,
      state.mappingLocked,
    ]
  );

  return (
    <SymbolContext.Provider value={value}>{children}</SymbolContext.Provider>
  );
};
