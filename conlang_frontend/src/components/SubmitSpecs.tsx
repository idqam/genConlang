import { useGrammarContext } from "@/app/context/GrammarContext";
import { useIpaSymbols } from "@/app/context/IpaSymbolContext";
import { useMapping } from "@/app/context/MappingContext";
import { usePhonoRules } from "@/app/context/PhoneRulesContext";
import { useSymbolContext } from "@/app/context/SymbolContext";
import React from "react";

const SubmitSpecs: React.FC = () => {
  const { activeVowels, activeConsonants, inputMapToPhoneme } =
    useSymbolContext();
  const { activeVowels: ipaVowels, activeConsonants: ipaConsonants } =
    useIpaSymbols();
  const { inputMapToPhoneme: mapping, mappingLocked } = useMapping();
  const {
    transformationRules,
    consonantClusters,
    vowelClusters,
    vowelHarmony,
  } = usePhonoRules();
  const { submittedData } = useGrammarContext();

  const handleSubmit = async () => {
    const symbolMapping = Object.fromEntries(inputMapToPhoneme);
    const phonemeMapping = Object.fromEntries(mapping);

    const payload = {
      symbols: {
        activeVowels,
        activeConsonants,
        inputMapToPhoneme: symbolMapping,
      },
      ipaSymbols: {
        ipaVowels,
        ipaConsonants,
      },
      mapping: {
        inputMapToPhoneme: phonemeMapping,
        mappingLocked,
      },
      phonologyRules: {
        transformationRules,
        consonantClusters,
        vowelClusters,
        vowelHarmony,
      },
      grammar: submittedData,
    };

    try {
      const response = await fetch("http://localhost:8000/api/v1/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Success:", data);
      alert("Data submitted successfully!");
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Submission failed. Check console for details.");
    }
  };

  return (
    <button
      onClick={handleSubmit}
      className="px-4 py-2 text-white rounded bg-gradient-to-r text-lg font-semibold from-pink-500 to-purple-600 "
    >
      Generate Language
    </button>
  );
};

export default SubmitSpecs;
