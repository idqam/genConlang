import { ReactNode, useState, createContext, useContext } from "react";

export interface AdditionalFeatures {
  grammaticalGender: string;
  evidentiality: string;
  politeness: string;
  negation: string;
  pronounSystem: string;
}

export interface LanguageInfluences {
  influencedBy: string;
  akinTo: string;
}

export interface GrammarFormData {
  morphology: string;
  wordOrder: string;
  nounCases: string;
  verbConjugation: string;
  tenseAspectMood: string;
  additionalFeatures: AdditionalFeatures;
  languageInfluences: LanguageInfluences;
}

export const initialGrammarFormData: GrammarFormData = {
  morphology: "",
  wordOrder: "",
  nounCases: "",
  verbConjugation: "",
  tenseAspectMood: "",
  additionalFeatures: {
    grammaticalGender: "",
    evidentiality: "",
    politeness: "",
    negation: "",
    pronounSystem: "",
  },
  languageInfluences: {
    influencedBy: "",
    akinTo: "",
  },
};

interface GrammarContextType {
  submittedData: GrammarFormData;
  updateSubmittedData: (data: GrammarFormData) => void;
}

const GrammarContext = createContext<GrammarContextType>({
  submittedData: initialGrammarFormData,
  updateSubmittedData: () => {},
});

interface GrammarProviderProps {
  children: ReactNode;
}

export const GrammarProvider: React.FC<GrammarProviderProps> = ({
  children,
}) => {
  const [submittedData, setSubmittedData] = useState<GrammarFormData>(
    initialGrammarFormData
  );

  const updateSubmittedData = (data: GrammarFormData) => {
    setSubmittedData(data);
  };

  return (
    <GrammarContext.Provider value={{ submittedData, updateSubmittedData }}>
      {children}
    </GrammarContext.Provider>
  );
};

export const useGrammarContext = (): GrammarContextType => {
  const context = useContext(GrammarContext);
  if (!context) {
    throw new Error("useGrammarContext must be used within a GrammarProvider");
  }
  return context;
};
