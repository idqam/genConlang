import { SymbolProvider } from "@/app/context/SymbolContext";
import { IPA_CONSONANTS, IPA_VOWELS } from "@/app/utils/constants";
import IpaButtonGrid from "./IpaButtonGrid";

export const IpaContainer = () => {
  return (
    <SymbolProvider>
      <div className="flex flex-col items-center p-4 min-h-screen w-full bg-zinc-800">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 p-4 bg-blue-400 rounded-lg shadow-md">
          IPA Selector
        </h1>
        <div className="flex flex-col md:flex-row justify-center gap-8 w-full max-w-6xl">
          <IpaButtonGrid symbols={IPA_CONSONANTS} header="Consonants" />
          <IpaButtonGrid symbols={IPA_VOWELS} header="Vowels" />
        </div>
      </div>
    </SymbolProvider>
  );
};
