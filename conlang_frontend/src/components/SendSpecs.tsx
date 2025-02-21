/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGrammarContext } from "@/app/context/GrammarContext";
import { useIpaSymbols } from "@/app/context/IpaSymbolContext";
import { useMapping } from "@/app/context/MappingContext";
import { usePhonoRules } from "@/app/context/PhoneRulesContext";
import {
  GrammarSpec,
  PhonologySpec,
  VowelHarmony,
  PayloadSpec,
} from "@/app/types/SpecPayload";

export const SendSpecs = () => {
  const { activeVowels, activeConsonants } = useIpaSymbols();
  const { inputMapToPhoneme } = useMapping();
  const {
    transformationRules,
    vowelHarmony,
    allowedSyllables,
    consonantClusters,
    vowelClusters,
  } = usePhonoRules();

  // Grammar data
  const { submittedData } = useGrammarContext();

  const grammar: GrammarSpec = {
    morphology: submittedData.morphology ?? "",
    wordOrder: submittedData.wordOrder ?? "",
    nounCases: submittedData.nounCases ?? "",
    verbConjugation: submittedData.verbConjugation ?? "",
    tenseAspectMood: submittedData.tenseAspectMood ?? "",
    additionalFeatures: {
      grammaticalGender:
        submittedData.additionalFeatures?.grammaticalGender ?? "",
      evidentiality: submittedData.additionalFeatures?.evidentiality ?? "",
      politeness: submittedData.additionalFeatures?.politeness ?? "",
      negation: submittedData.additionalFeatures?.negation ?? "",
      pronounSystem: submittedData.additionalFeatures?.pronounSystem ?? "",
    },
  };

  // Phonology data
  const phonology: PhonologySpec = {
    activeVowels: activeVowels ?? [],
    activeConsonants: activeConsonants ?? [],
    mapping: inputMapToPhoneme ?? {},
    allowedSyllables: allowedSyllables ?? [],
    transformationRules: transformationRules ?? "",
    consonantClusters: consonantClusters ?? "",
    vowelClusters: vowelClusters ?? "",
    vowelHarmony:
      vowelHarmony ??
      ({
        isEnabled: false,
        inputs: {
          front: [],
          back: [],
          neutral: [],
        },
      } as VowelHarmony),
  };

  const payload: PayloadSpec = {
    language: "Language",
    phonology,
    grammar,
  };

  return (
    <button
      className="border-2 rounded-xl p-2 text-black"
      onClick={() => submitSpecs(payload)}
    >
      Test Payload
    </button>
  );
};

async function submitSpecs(payload: PayloadSpec) {
  console.log("Payload before sending:", JSON.stringify(payload, null, 2));

  try {
    const response = await fetch("http://localhost:8000/api/v1/submit-specs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("Server response error: ", data);
      throw new Error(`Server Error: ${response.status} - ${data.message}`);
    }

    console.log("DATA:", data);
  } catch (error: any) {
    alert(`Test failed: ${error.message}`);
  }
}
