"use client";
import { IpaContainer } from "@/components/IpaContainer";
import { SymbolProvider } from "../context/SymbolContext";

export default function Conlang() {
  return (
    <SymbolProvider>
      <IpaContainer />
    </SymbolProvider>
  );
}
