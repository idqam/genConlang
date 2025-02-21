"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";

interface MappingState {
  inputMapToPhoneme: Record<string, string>;
  mappingLocked: boolean;
}

type MappingAction =
  | { type: "UPDATE_MAPPING"; mappings: Record<string, string> }
  | { type: "LOCK_MAPPING" }
  | { type: "UNLOCK_MAPPING" };

const initialMappingState: MappingState = {
  inputMapToPhoneme: {},
  mappingLocked: false,
};

function mappingReducer(
  state: MappingState,
  action: MappingAction
): MappingState {
  switch (action.type) {
    case "UPDATE_MAPPING":
      return {
        ...state,
        inputMapToPhoneme: { ...state.inputMapToPhoneme, ...action.mappings },
      };
    case "LOCK_MAPPING":
      return { ...state, mappingLocked: true };
    case "UNLOCK_MAPPING":
      return { ...state, mappingLocked: false };
    default:
      return state;
  }
}

interface MappingContextValue {
  inputMapToPhoneme: Record<string, string>;
  mappingLocked: boolean;
  updateInputMapToPhoneme: (mappings: Record<string, string>) => void;
  lockMapping: () => void;
  unlockMapping: () => void;
}

const MappingContext = createContext<MappingContextValue | undefined>(
  undefined
);

export const useMapping = (): MappingContextValue => {
  const context = useContext(MappingContext);
  if (!context) {
    throw new Error("useMapping must be used within a MappingProvider");
  }
  return context;
};

interface MappingProviderProps {
  children: ReactNode;
}

export const MappingProvider: React.FC<MappingProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(mappingReducer, initialMappingState);

  const updateInputMapToPhoneme = (mappings: Record<string, string>) => {
    dispatch({ type: "UPDATE_MAPPING", mappings });
  };

  const lockMapping = () => dispatch({ type: "LOCK_MAPPING" });
  const unlockMapping = () => dispatch({ type: "UNLOCK_MAPPING" });

  return (
    <MappingContext.Provider
      value={{
        inputMapToPhoneme: state.inputMapToPhoneme,
        mappingLocked: state.mappingLocked,
        updateInputMapToPhoneme,
        lockMapping,
        unlockMapping,
      }}
    >
      {children}
    </MappingContext.Provider>
  );
};
