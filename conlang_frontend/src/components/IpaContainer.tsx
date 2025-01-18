import { IPA_CONSONANTS, IPA_VOWELS } from "@/app/utils/constants";
import IpaButtonGrid from "./IpaButtonGrid";

export const IpaContainer = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center p-4">
      <div id="IPA-selection" className="mt-6">
        <h1 className="text-black text-3xl border-2 rounded-xl p-2 mb-8 font-bold bg-blue-300">
          IPA Selector
        </h1>
      </div>

      <div id="IPA-grid" className="flex flex-row justify-center gap-8">
        <IpaButtonGrid symbols={IPA_CONSONANTS} header="Consonants" />
        <IpaButtonGrid symbols={IPA_VOWELS} header="Vowels" />
      </div>
    </div>
  );
};
