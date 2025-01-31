/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { SymbolProvider } from "../context/SymbolContext";
import { Button } from "@/components/ui/button";
import IpaButtonGrid from "@/components/IpaButtonGrid";
import { IPA_CONSONANTS, IPA_VOWELS } from "../utils/constants";
import { Separator } from "@/components/ui/separator";
import PhonotacticRuleForm from "@/components/PhonotacticRuleForm";
import SymbolMappingForm from "@/components/SymbolMappingForm";
import NavBar, { NavItem } from "@/components/NavBar";
import { useState } from "react";

export default function Conlang() {
  const [navItems, setNavItems] = useState<NavItem[]>([
    { id: "phonology", label: "Phonology" },
    { id: "grammar", label: "Grammar" },
  ]);
  const [activeTab, setActiveTab] = useState<string>("phonology");
  const [languageName, setLanguageName] = useState<string>("");

 
  const handleGenerateLanguage = () => {
    const newLanguageName = ""
    setLanguageName(newLanguageName);
    if (!navItems.some((item) => item.id === "language")) {
      setNavItems([...navItems, { id: "language", label: newLanguageName }]);
    }
    setActiveTab("language");
  };

  return (
    <>
      <SymbolProvider>
        <div className=" grid space-y-8 w-screen min-h-screen bg-gradient-to-tl from-amber-200 via-teal-500 to-pink-200 pl-2 ">
          <header className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight border-2 rounded-xl bg-gradient-to-l from-pink-500 to-purple-800 text-white p-2">
              Conlang Generator
            </h1>
            <p className="text-lg  max-w-2xl mx-auto text-black">
              Create unique constructed languages for your fantasy worlds with
              phonological rules, grammar systems, and vocabulary generation.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-2 text-xl"
            >
              Generate New Language
            </Button>
          </header>
          <NavBar
            items={navItems}
            activeId={activeTab}
            onChange={setActiveTab}
          />
          {activeTab === "phonology" && (
            <div className=" grid place-content-center">
              <div className="flex flex-row gap-y-4 gap-x-10 p-4">
                <div className="flex flex-col  gap-y-4">
                  <header className="text-center justify-self-start text-xl font-bold m-0">
                    {" "}
                    Phoneme Selection
                  </header>
                  <IpaButtonGrid symbols={IPA_VOWELS} header="Vowels" />

                  <Separator />

                  <IpaButtonGrid symbols={IPA_CONSONANTS} header="Consonants" />
                </div>
                <div className="grid grid-col-1 gap-y-4">
                  <header className="text-center justify-self-start text-xl font-bold ">
                    Phonotactic rules{" "}
                  </header>
                  <PhonotacticRuleForm />
                </div>
                <div className="items-start">
                  <h2 className="text-xl font-semibold mb-4">
                    Symbol to IPA Mapping
                  </h2>
                  <SymbolMappingForm />
                </div>
              </div>
            </div>
          )}
          {activeTab === "grammar" && (
            <div className="p-4">
              <h2 className="text-xl font-bold">Grammar Input</h2>
              <p className="text-gray-700">Grammar input UI coming soon...</p>
            </div>
          )}
          {activeTab === "language" && (
            <div className="p-4">
              <h2 className="text-xl font-bold">
                Generated Language: {languageName}
              </h2>
              <p className="text-gray-700">
                Your conlang output will appear here.
              </p>
            </div>
          )}
        </div>
      </SymbolProvider>
    </>
  );
}
