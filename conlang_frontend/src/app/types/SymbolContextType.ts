/* eslint-disable @typescript-eslint/no-explicit-any */
export interface SymbolContextType {
  vowels: string[];
  consonants: string[];
  activeVowels: string[];
  activeConsonants: string[];
  toggleSymbol: (symbol: string) => void;
  isSymbolActive: (symbol: string) => boolean;
  updateInputMapToPhoneme: (key: string, value: string) => void;
  inputMapToPhoneme: Map<string, string>;
  mappingLocked: boolean;
  lockMapping: () => void;
  unlockMapping: () => void;
}
