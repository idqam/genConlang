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
      <div className="flex flex-col space-y-6">
        <div>
          <Label className="font-semibold">Permissible Syllables</Label>
          <div className="flex space-x-2 mt-1">
            <Textarea placeholder="Separate syllables by ',' (parentheses mean optional)" />
            <Button onClick={() => console.log("Add syllables")}>
              Add Syllables
            </Button>
          </div>
        </div>

        <div>
          <Label className="font-semibold">Allowed Consonant Clusters</Label>
          <div className="flex space-x-2 mt-1">
            <Input
              placeholder="Separate clusters by ','"
              value={consonantClusters}
              onChange={(e) => setConsonantClusters(e.target.value)}
            />
            <Button onClick={() => console.log("Add C-Clusters")}>
              Add Clusters
            </Button>
          </div>
        </div>

        <div>
          <Label className="font-semibold">Allowed Vowel Clusters</Label>
          <div className="flex space-x-2 mt-1">
            <Input
              placeholder="Separate clusters by ','"
              value={vowelClusters}
              onChange={(e) => setVowelClusters(e.target.value)}
            />
            <Button onClick={() => console.log("Add V-Clusters")}>
              Add Clusters
            </Button>
          </div>
        </div>

        <div>
          <Label className="font-semibold">Transformation Rules</Label>
          <div className="flex space-x-4 mt-2">
            <Textarea
              placeholder="Enter transformation rules based on schema"
              className="min-h-48"
              value={transformationRules}
              onChange={(e) => setTransformationRules(e.target.value)}
            />
            <Button onClick={() => console.log("Add Rules")}>Add Rules</Button>
          </div>

          <div className="border-2 border-gray-500 p-4 rounded-md text-xs mt-2 max-h-48 overflow-y-scroll bg-gray-900 text-white">
            <p className="font-bold text-blue-400">Rule Syntax:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Use <b>uppercase</b> for generic consonants (C) and vowels (V).
              </li>
              <li>Use the selected IPA symbols (e.g., &apos;a&apos; for ɘ).</li>
              <li>
                Rules must be enclosed in <b>[ ]</b> and use <b>&gt;</b> for
                transformations.
              </li>
              <li>
                <b>X &gt; Y</b>: X transforms into Y.
              </li>
              <li>
                <b>/</b> means &apos;before&apos;: <b>X &gt; Y / O</b> → X
                transforms before O.
              </li>
              <li>
                <b>\</b> means &apos;after&apos;: <b>X &gt; Y \ O</b> → X
                transforms after O.
              </li>
              <li>
                <b>:</b> denotes long phonemes (e.g., <b>X &gt; X: / C</b>).
              </li>
              <li>
                <b>^</b> denotes a conditional (if-clause).
              </li>
              <li>
                <b>$</b> represents an empty character.
              </li>
              <li>
                <b>#</b> denotes an &apos;-is&apos; condition.
              </li>
              <li>
                <b>!</b> denotes an &apos;-or&apos; condition.
              </li>
              <li>
                <b>()</b> denotes an inclusive set.
              </li>
            </ul>
            <p className="mt-2 text-blue-300">
              <b>Example:</b> <code>[ea &gt; e: \ C ^ C#(t,p,q,r)]</code> →
              &apos;ea&apos; becomes &apos;e:&apos; if followed by C, where C is
              one of (t, p, q, r).
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <IpaSwitchComponent />
        </div>

        <Button
          className="w-full hover:bg-red-300 hover:text-black"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};
