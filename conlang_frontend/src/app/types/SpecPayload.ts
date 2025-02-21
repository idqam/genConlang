export interface PhonologySpec {
  activeVowels: string[];
  activeConsonants: string[];
  mapping: Record<string, string>;
  allowedSyllables: string[];
  transformationRules: string;
  consonantClusters: string;
  vowelClusters: string;
  vowelHarmony: VowelHarmony;
}

export interface GrammarSpec {
  morphology: string;
  wordOrder: string;
  nounCases: string;
  verbConjugation: string;
  tenseAspectMood: string;
  additionalFeatures?: AdditionalFeatureSpec;
  languageInfluences?: LangInfluencesSpec;
}
export interface VowelHarmony {
  isEnabled: boolean;
  inputs: {
    front: string[];
    back: string[];
    neutral: string[];
  };
}
export interface AdditionalFeatureSpec {
  grammaticalGender: string;
  evidentiality: string;
  politeness: string;
  negation: string;
  pronounSystem: string;
}

interface LangInfluencesSpec {
  influencedBy: string;
  akinTo: string;
}

export interface PayloadSpec {
  language?: string;
  phonology: PhonologySpec;
  grammar: GrammarSpec;
}
