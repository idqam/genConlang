"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useMemo,
  useCallback,
} from "react";
import { IPA_VOWELS, IPA_CONSONANTS } from "../utils/constants";

interface IpaSymbolsState {
  activeVowels: string[];
  activeConsonants: string[];
}

type IpaSymbolsAction = { type: "TOGGLE_SYMBOL"; symbol: string };

const initialIpaSymbolsState: IpaSymbolsState = {
  activeVowels: [],
  activeConsonants: [],
};

function ipaSymbolsReducer(
  state: IpaSymbolsState,
  action: IpaSymbolsAction
): IpaSymbolsState {
  switch (action.type) {
    case "TOGGLE_SYMBOL": {
      const { symbol } = action;
      if (IPA_VOWELS.includes(symbol)) {
        return {
          ...state,
          activeVowels: state.activeVowels.includes(symbol)
            ? state.activeVowels.filter((v) => v !== symbol)
            : [...state.activeVowels, symbol],
        };
      } else if (IPA_CONSONANTS.includes(symbol)) {
        return {
          ...state,
          activeConsonants: state.activeConsonants.includes(symbol)
            ? state.activeConsonants.filter((c) => c !== symbol)
            : [...state.activeConsonants, symbol],
        };
      }
      return state;
    }
    default:
      return state;
  }
}

interface IpaSymbolsContextValue {
  vowels: string[];
  consonants: string[];
  activeVowels: string[];
  activeConsonants: string[];
  toggleSymbol: (symbol: string) => void;
  isSymbolActive: (symbol: string) => boolean;
}

const IpaSymbolsContext = createContext<IpaSymbolsContextValue | undefined>(
  undefined
);

export const useIpaSymbols = (): IpaSymbolsContextValue => {
  const context = useContext(IpaSymbolsContext);
  if (!context) {
    throw new Error("useIpaSymbols must be used within an IpaSymbolsProvider");
  }
  return context;
};

interface IpaSymbolsProviderProps {
  children: ReactNode;
}

export const IpaSymbolsProvider: React.FC<IpaSymbolsProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(
    ipaSymbolsReducer,
    initialIpaSymbolsState
  );

  const toggleSymbol = (symbol: string) => {
    dispatch({ type: "TOGGLE_SYMBOL", symbol });
  };

  const isSymbolActive = useCallback(
    (symbol: string) =>
      state.activeVowels.includes(symbol) ||
      state.activeConsonants.includes(symbol),
    [state.activeVowels, state.activeConsonants]
  );

  const value = useMemo(
    () => ({
      vowels: IPA_VOWELS,
      consonants: IPA_CONSONANTS,
      activeVowels: state.activeVowels,
      activeConsonants: state.activeConsonants,
      toggleSymbol,
      isSymbolActive,
    }),
    [state.activeVowels, state.activeConsonants, isSymbolActive]
  );

  return (
    <IpaSymbolsContext.Provider value={value}>
      {children}
    </IpaSymbolsContext.Provider>
  );
};
