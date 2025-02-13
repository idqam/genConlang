/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import IpaButtonGrid from "@/components/IpaButtonGrid";
import { IPA_CONSONANTS, IPA_VOWELS } from "../utils/constants";
import { Separator } from "@/components/ui/separator";
import PhonotacticRuleForm from "@/components/PhonotacticRuleForm";
import SymbolMappingForm from "@/components/SymbolMappingForm";
import NavBar, { NavItem } from "@/components/NavBar";
import { useState } from "react";
import ButtonGridAnimated from "@/components/animated/ButtonGridAnimated";
import { IpaSymbolsProvider } from "../context/IpaSymbolContext";
import { MappingProvider } from "../context/MappingContext";

export default function Conlang() {
  const [navItems, setNavItems] = useState<NavItem[]>([
    { id: "phonology", label: "Phonology" },
    { id: "grammar", label: "Grammar" },
  ]);
  const [activeTab, setActiveTab] = useState<string>("phonology");
  const [languageName, setLanguageName] = useState<string>("");

  const handleGenerateLanguage = () => {
    const newLanguageName = "";
    setLanguageName(newLanguageName);
    if (!navItems.some((item) => item.id === "language")) {
      setNavItems([...navItems, { id: "language", label: newLanguageName }]);
    }
    setActiveTab("language");
  };

  return (
    <>
      <IpaSymbolsProvider>
        <MappingProvider>
          <div className="grid w-screen min-h-screen bg-gradient-to-tl from-amber-200 via-teal-500 to-pink-200 pl-2 space-y-8">
            <header className="text-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tight border-2 rounded-xl bg-gradient-to-l from-pink-500 to-purple-800 text-white p-2">
                Conlang Generator
              </h1>
              <p className="text-lg max-w-2xl mx-auto text-black">
                Create unique constructed languages for your fantasy worlds with
                phonological rules, grammar systems, and vocabulary generation.
              </p>
              <Button className="bg-gradient-to-r text-lg font-semibold from-pink-500 to-purple-600 text-white p-2">
                Generate New Language
              </Button>
            </header>

            <NavBar
              items={navItems}
              activeId={activeTab}
              onChange={setActiveTab}
            />

            {activeTab === "phonology" && (
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

                <div className="flex flex-col items-center">
                  <header className="text-xl text-black  font-semibold mb-8">
                    Phonotactic rules
                  </header>

                  <PhonotacticRuleForm />
                </div>

                <div className="flex flex-col items-center">
                  <h2 className="text-xl text-black font-semibold mb-4">
                    Symbol to IPA Mapping
                  </h2>
                  <SymbolMappingForm />
                </div>
              </div>
            )}
          </div>
        </MappingProvider>
      </IpaSymbolsProvider>
    </>
  );
}
