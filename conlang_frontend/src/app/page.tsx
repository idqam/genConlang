"use client";
import ButtonGridAnimated from "@/components/animated/ButtonGridAnimated";
import GrammarConfigurator from "@/components/GrammarConfigurator";
import NavBar, { NavItem } from "@/components/NavBar";
import { PhonoRulesForm } from "@/components/PhonoRulesForm";
import SymbolMappingForm from "@/components/SymbolMappingForm";
import { Separator } from "@radix-ui/react-separator";
import { useState, useEffect } from "react";
import { GrammarProvider } from "./context/GrammarContext";
import { IpaSymbolsProvider } from "./context/IpaSymbolContext";
import {
  LanguageProvider,
  useLanguageContext,
} from "./context/LanguageContext";
import { MappingProvider } from "./context/MappingContext";
import { PhonoRulesProvider } from "./context/PhoneRulesContext";
import { IPA_VOWELS, IPA_CONSONANTS } from "./utils/constants";
import { SendSpecs } from "@/components/SendSpecs";

export default function Home() {
  const [navItems, setNavItems] = useState<NavItem[]>([
    { id: "specification", label: "Specification" },
  ]);
  const [activeTab, setActiveTab] = useState<string>("specification");

  return (
    <LanguageProvider>
      <IpaSymbolsProvider>
        <PhonoRulesProvider>
          <MappingProvider>
            <GrammarProvider>
              <InnerHome
                navItems={navItems}
                setNavItems={setNavItems}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </GrammarProvider>
          </MappingProvider>
        </PhonoRulesProvider>
      </IpaSymbolsProvider>
    </LanguageProvider>
  );
}

function InnerHome({
  navItems,
  setNavItems,
  activeTab,
  setActiveTab,
}: {
  navItems: NavItem[];
  setNavItems: React.Dispatch<React.SetStateAction<NavItem[]>>;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { generatedLanguage } = useLanguageContext();

  useEffect(() => {
    if (generatedLanguage && !navItems.some((item) => item.id === "language")) {
      setNavItems((prev) => [...prev, { id: "language", label: "Language" }]);
    }
  }, [generatedLanguage, navItems, setNavItems]);

  return (
    <div className="grid w-screen min-h-screen bg-gradient-to-tl from-amber-200 via-teal-500 to-pink-200 pl-2 space-y-8">
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight border-2 rounded-xl bg-gradient-to-l from-pink-500 to-purple-800 text-white p-2">
          Conlang Generator
        </h1>
        <p className="text-lg max-w-2xl mx-auto text-black">
          Create unique constructed languages for your fantasy worlds with
          phonological rules, grammar systems, and vocabulary generation.
        </p>
      </header>
      <SendSpecs />
      <NavBar items={navItems} activeId={activeTab} onChange={setActiveTab} />

      {activeTab === "specification" && (
        <>
          <div className="flex flex-row gap-y-4 gap-x-10 p-4 justify-center">
            <div className="flex flex-col gap-y-4 items-center">
              <header className="text-xl text-black font-semibold mb-0">
                Phoneme Selection
              </header>
              <ButtonGridAnimated symbols={IPA_VOWELS} header="Vowels" />
              <Separator />
              <ButtonGridAnimated
                symbols={IPA_CONSONANTS}
                header="Consonants"
              />
            </div>

            <div className="flex flex-col items-center justify-center space-y-7">
              <header className="text-xl text-black font-semibold mb-8">
                Phonotactic Rules
              </header>
              <PhonoRulesForm />
            </div>

            <div className="flex flex-col items-center">
              <h2 className="text-xl text-black font-semibold mb-4">
                Symbol to IPA Mapping
              </h2>
              <SymbolMappingForm />
            </div>
          </div>
          <GrammarConfigurator />
        </>
      )}

      {activeTab === "language" && <></>}
    </div>
  );
}
