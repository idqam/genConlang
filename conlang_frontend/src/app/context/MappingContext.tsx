"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useMemo,
} from "react";

interface MappingState {
  inputMapToPhoneme: Map<string, string>;
  mappingLocked: boolean;
}

type MappingAction =
  | { type: "UPDATE_MAPPING"; key: string; value: string }
  | { type: "LOCK_MAPPING" }
  | { type: "UNLOCK_MAPPING" };

const initialMappingState: MappingState = {
  inputMapToPhoneme: new Map<string, string>(),
  mappingLocked: false,
};

function mappingReducer(
  state: MappingState,
  action: MappingAction
): MappingState {
  switch (action.type) {
    case "UPDATE_MAPPING": {
      const newMap = new Map(state.inputMapToPhoneme);
      newMap.set(action.key, action.value);
      return { ...state, inputMapToPhoneme: newMap };
    }
    case "LOCK_MAPPING":
      return { ...state, mappingLocked: true };
    case "UNLOCK_MAPPING":
      return { ...state, mappingLocked: false };
    default:
      return state;
  }
}

interface MappingContextValue {
  inputMapToPhoneme: Map<string, string>;
  mappingLocked: boolean;
  updateInputMapToPhoneme: (key: string, value: string) => void;
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

  const updateInputMapToPhoneme = (key: string, value: string) => {
    dispatch({ type: "UPDATE_MAPPING", key, value });
  };

  const lockMapping = () => dispatch({ type: "LOCK_MAPPING" });
  const unlockMapping = () => dispatch({ type: "UNLOCK_MAPPING" });

  const value = useMemo(
    () => ({
      inputMapToPhoneme: state.inputMapToPhoneme,
      mappingLocked: state.mappingLocked,
      updateInputMapToPhoneme,
      lockMapping,
      unlockMapping,
    }),
    [state.inputMapToPhoneme, state.mappingLocked]
  );

  return (
    <MappingContext.Provider value={value}>{children}</MappingContext.Provider>
  );
};
