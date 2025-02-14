"use client";

import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { IpaSwitchComponent } from "./IpaSwitchComponent";
import { usePhonoRules } from "@/app/context/PhoneRulesContext";

export const PhonoRulesForm = () => {
  const {
    transformationRules,
    setTransformationRules,
    consonantClusters,
    setConsonantClusters,
    vowelClusters,
    setVowelClusters,
    vowelHarmony,
  } = usePhonoRules();

  const handleSubmit = () => {
    const json = {
      transformationRules,
      consonantClusters,
      vowelClusters,
      vowelHarmony,
    };
    console.log(json);
  };

  return (
    <div className="p-8 border rounded-lg space-y-8 bg-zinc-800">
      <div className="flex flex-col justify-start gap-y-1 m-0 pl-2">
        <Label className="font-semibold">Permissible Syllables</Label>
        <div className="flex flex-row space-x-2 items-center m-0">
          <Textarea
            id="syllableInput"
            placeholder="separate allowed syllables by a comma ',' parentheses means optional"
          ></Textarea>
          <Button
            id="add_syllables"
            onClick={() => console.log("Add syllables")}
          >
            Add Syllables
          </Button>
        </div>
        <Label className="font-semibold mt-6">Allowed Consonant Clusters</Label>
        <div className="flex flex-row space-x-2 items-center m-0">
          <Input
            id="allowedConsonantsClusters"
            placeholder="separate allowed consonant clusters by a comma ','"
            value={consonantClusters}
            onChange={(e) => setConsonantClusters(e.target.value)}
          ></Input>
          <Button
            id="add_consonantClusters"
            onClick={() => console.log("Add C-Clusters")}
          >
            Add C-Clusters
          </Button>
        </div>
        <Label className="font-semibold mt-2">Allowed Vowel Clusters</Label>
        <div className="flex flex-row space-x-2 items-center m-0">
          <Input
            id="allowedVowelClusters"
            placeholder="separate allowed vowel clusters by a comma ','"
            value={vowelClusters}
            onChange={(e) => setVowelClusters(e.target.value)}
          ></Input>
          <Button
            id="add_vowelClusters"
            onClick={() => console.log("Add V-Clusters")}
          >
            Add V-Clusters
          </Button>
        </div>
        <Label className="font-semibold mt-6">Transformation Rules</Label>
        <div
          id="transRules"
          className="flex flex-row space-x-2 items-center m-0"
        >
          <Textarea
            id="transformationRules"
            placeholder="Look at schema -> "
            className="min-h-48"
            value={transformationRules}
            onChange={(e) => setTransformationRules(e.target.value)}
          ></Textarea>
          <Button
            id="add_transformRules"
            onClick={() => console.log("Add Rules")}
          >
            Add Rules
          </Button>
          <div
            id="transruleSet"
            className="max-h-48 border-2 border-rock-400 min-w-56 p-2 rounded text-xs max-w-64 overflow-y-scroll"
          >
            <ol className="list-decimal pl-4 space-y-2">
              <li>
                Use uppercase for Consonant and Vowel generics, lowercase for
                specific letters.
              </li>
              <li>
                Use the symbols you selected for the IPA symbols, hence if you
                chose a for ɘ, then use a.
              </li>
              <li>
                Denote each rule via{" "}
                <span className="p-0 m-0 text-red-500">{">"}</span> and
                encapsulate them in square brackets{" "}
                <span className="p-0 m-0 text-red-500">{" [RULE]"}</span>
              </li>
              <li>&quot;X {">"} Y&quot; means X becomes Y.</li>
              <li>
                <span className="p-0 m-0 text-red-500">/</span> means
                &quot;before&quot; hence &quot;X {">"} Y / O&quot; means X
                becomes Y before O.
              </li>
              <li>
                <span className="p-0 m-0 text-red-500">\</span> means {"after"}.
              </li>
              <li>
                <span className="p-0 m-0 text-red-500">:</span> denotes long
                phoneme hence you can have {"X > X: / C"}.
              </li>
              <li>
                <span className="p-0 m-0 text-red-500">^</span> denotes a
                generic if conditional.
              </li>
              <li>
                <span className="p-0 m-0 text-red-500">$</span> will denote the
                empty character.
              </li>
              <li>
                <span className="p-0 m-0 text-red-500">#</span> will denote an
                -is conditional.
              </li>
              <li>
                <span className="p-0 m-0 text-red-500"> !</span> will denote an
                -or conditional.
              </li>
              <li>
                <span className="p-0 m-0 text-red-500"> ()</span> will denote
                inclusive sets.
              </li>
            </ol>
            <div className="text-blue-300 mt-4">
              Example: [{"ea > e: "} \ {"C"} ^ {"C#(t,p,q,r)"}], means the vowel
              cluster ea becomes a long e if followed by a consonant if that
              consonant is either t, p, q, or r.
            </div>
          </div>
        </div>
        <div id="vowel-harmony">
          <IpaSwitchComponent />
        </div>
        <Button
          type="button"
          className="hover:bg-red-300 hover:text-black"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};
