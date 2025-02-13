/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useReducer, useState, useCallback } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useMapping } from "@/app/context/MappingContext";
import { useIpaSymbols } from "@/app/context/IpaSymbolContext";

const syllableSchema = z.object({
  syllable: z.string().min(1, "Syllable is required"),
});

const clusterSchema = z.object({
  cluster: z.string().min(1, "Cluster is required"),
});

const transformationSchema = z.object({
  condition: z.string().min(1, "Condition is required"),
  transformation: z.string().min(1, "Transformation is required"),
});

const vowelHarmonySchema = z
  .object({
    enabled: z.boolean().default(false),
    front: z.string().optional(),
    back: z.string().optional(),
    neutral: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.enabled) {
        return (
          (data.front?.trim().length ?? 0) > 0 &&
          (data.back?.trim().length ?? 0) > 0 &&
          (data.neutral?.trim().length ?? 0) > 0
        );
      }
      return true;
    },
    {
      message:
        "When vowel harmony is enabled, please specify Front, Back, and Neutral symbols.",
      path: ["front"],
    }
  );

const phonotacticRuleSchema = z.object({
  permissibleSyllables: z.array(syllableSchema).default([]),
  transformationRules: z.array(transformationSchema).default([]),
  allowedConsonantClusters: z.array(clusterSchema).default([]),
  allowedVowelClusters: z.array(clusterSchema).default([]),
  vowelHarmony: vowelHarmonySchema,
  complexSyllableRules: z.string().optional(),
});

export type PhonotacticRule = z.infer<typeof phonotacticRuleSchema>;

interface Submission {
  ruleSet: PhonotacticRule;
  ipaMapping: { [key: string]: string };
}

type SubmissionAction = { type: "ADD_SUBMISSION"; payload: Submission };

function submissionReducer(
  state: Submission[],
  action: SubmissionAction
): Submission[] {
  switch (action.type) {
    case "ADD_SUBMISSION":
      return [...state, action.payload];
    default:
      return state;
  }
}

export default function PhonotacticRuleForm() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<PhonotacticRule>({
    resolver: zodResolver(phonotacticRuleSchema),
    defaultValues: {
      permissibleSyllables: [],
      transformationRules: [],
      allowedConsonantClusters: [],
      allowedVowelClusters: [],
      vowelHarmony: { enabled: false, front: "", back: "", neutral: "" },
      complexSyllableRules: "",
    },
  });

  const {
    fields: syllableFields,
    append: appendSyllable,
    remove: removeSyllable,
  } = useFieldArray({ control, name: "permissibleSyllables" });

  const {
    fields: transformationFields,
    append: appendTransformation,
    remove: removeTransformation,
  } = useFieldArray({ control, name: "transformationRules" });

  const {
    fields: consonantFields,
    append: appendConsonant,
    remove: removeConsonant,
  } = useFieldArray({ control, name: "allowedConsonantClusters" });

  const {
    fields: vowelFields,
    append: appendVowel,
    remove: removeVowel,
  } = useFieldArray({ control, name: "allowedVowelClusters" });

  const [newSyllable, setNewSyllable] = useState("");
  const [newTransformationCondition, setNewTransformationCondition] =
    useState("");
  const [newTransformationValue, setNewTransformationValue] = useState("");
  const [newConsonantCluster, setNewConsonantCluster] = useState("");
  const [newVowelCluster, setNewVowelCluster] = useState("");

  const addSyllable = () => {
    if (newSyllable.trim() === "") return;
    appendSyllable({ syllable: newSyllable });
    setNewSyllable("");
  };

  const addTransformation = () => {
    if (
      newTransformationCondition.trim() === "" ||
      newTransformationValue.trim() === ""
    )
      return;
    appendTransformation({
      condition: newTransformationCondition,
      transformation: newTransformationValue,
    });
    setNewTransformationCondition("");
    setNewTransformationValue("");
  };

  const addConsonantCluster = () => {
    if (newConsonantCluster.trim() === "") return;
    appendConsonant({ cluster: newConsonantCluster });
    setNewConsonantCluster("");
  };

  const addVowelCluster = () => {
    if (newVowelCluster.trim() === "") return;
    appendVowel({ cluster: newVowelCluster });
    setNewVowelCluster("");
  };

  const [activeIPAField, setActiveIPAField] = useState<
    "front" | "back" | "neutral" | null
  >(null);

  const { vowels } = useIpaSymbols();
  const { inputMapToPhoneme } = useMapping();

  const insertSymbol = useCallback(
    (symbol: string) => {
      if (!activeIPAField) return;
      const currentValue = getValues(`vowelHarmony.${activeIPAField}`) || "";
      setValue(`vowelHarmony.${activeIPAField}`, currentValue + symbol);
    },
    [activeIPAField, getValues, setValue]
  );

  const [submissions, dispatch] = useReducer(submissionReducer, []);

  const onSubmit = (data: PhonotacticRule) => {
    console.log("Submitted rule set:", data);
    const ipaMappingObj = Object.fromEntries(
      Array.from(inputMapToPhoneme.entries())
    );
    dispatch({
      type: "ADD_SUBMISSION",
      payload: { ruleSet: data, ipaMapping: ipaMappingObj },
    });
  };

  const formValues = watch();

  return (
    <div className="p-8 border rounded-lg space-y-8 bg-zinc-800">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Permissible Syllables */}
        <div>
          <Label className="font-semibold" htmlFor="syllableInput">
            Permissible Syllables
          </Label>
          <div className="flex gap-2">
            <Input
              id="syllableInput"
              placeholder="e.g., CVC, (C)V(C), CV"
              value={newSyllable}
              onChange={(e) => setNewSyllable(e.target.value)}
            />
            <Button type="button" onClick={addSyllable}>
              Add Syllable
            </Button>
          </div>
          <div>
            {syllableFields.map((field, index) => (
              <div
                key={field.id}
                className="flex items-center justify-between border-b py-1"
              >
                <span>{field.syllable}</span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeSyllable(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Transformation Rules */}
        <div className="border p-4 rounded">
          <p className="font-semibold mb-2">Transformation Rules</p>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col sm:flex-row sm:items-end gap-2">
              <div className="flex-1">
                <Label htmlFor="transformationCondition">Condition</Label>
                <Input
                  id="transformationCondition"
                  placeholder="e.g., syllable ends with a consonant"
                  value={newTransformationCondition}
                  onChange={(e) =>
                    setNewTransformationCondition(e.target.value)
                  }
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="transformationValue">Transformation</Label>
                <Input
                  id="transformationValue"
                  placeholder="e.g., append 'a'"
                  value={newTransformationValue}
                  onChange={(e) => setNewTransformationValue(e.target.value)}
                />
              </div>
              <Button type="button" onClick={addTransformation}>
                Add Transformation
              </Button>
            </div>
            <div>
              {transformationFields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex items-center justify-between border-b py-1"
                >
                  <span>
                    <strong>{field.condition}</strong>: {field.transformation}
                  </span>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeTransformation(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Allowed Consonant Clusters */}
        <div>
          <p className="font-semibold">Allowed Consonant Clusters</p>
          <div className="flex gap-2">
            <Input
              id="consonantClusterInput"
              placeholder="e.g., bl, tr, sp"
              value={newConsonantCluster}
              onChange={(e) => setNewConsonantCluster(e.target.value)}
            />
            <Button type="button" onClick={addConsonantCluster}>
              Add Cluster
            </Button>
          </div>
          <div>
            {consonantFields.map((field, index) => (
              <div
                key={field.id}
                className="flex items-center justify-between border-b py-1"
              >
                <span>{field.cluster}</span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeConsonant(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Allowed Vowel Clusters */}
        <div>
          <p className="font-semibold">Allowed Vowel Clusters</p>
          <div className="flex gap-2">
            <Input
              id="vowelClusterInput"
              placeholder="e.g., ai, ou, ea"
              value={newVowelCluster}
              onChange={(e) => setNewVowelCluster(e.target.value)}
            />
            <Button type="button" onClick={addVowelCluster}>
              Add Cluster
            </Button>
          </div>
          <div>
            {vowelFields.map((field, index) => (
              <div
                key={field.id}
                className="flex items-center justify-between border-b py-1"
              >
                <span>{field.cluster}</span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeVowel(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Vowel Harmony */}
        <div>
          <div className="flex items-center gap-3">
            <Label htmlFor="vowelHarmony.enabled">Enable Vowel Harmony?</Label>
            <Controller
              control={control}
              name="vowelHarmony.enabled"
              render={({ field }) => (
                <Switch
                  id="vowelHarmony.enabled"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>
          {watch("vowelHarmony.enabled") && (
            <div className="mt-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center space-y-2">
                  <Label htmlFor="vowelHarmony.front">Front</Label>
                  <Input
                    id="vowelHarmony.front"
                    placeholder="e.g., i, e"
                    {...register("vowelHarmony.front")}
                    onFocus={() => setActiveIPAField("front")}
                  />
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <Label htmlFor="vowelHarmony.back">Back</Label>
                  <Input
                    id="vowelHarmony.back"
                    placeholder="e.g., a, o"
                    {...register("vowelHarmony.back")}
                    onFocus={() => setActiveIPAField("back")}
                  />
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <Label htmlFor="vowelHarmony.neutral">Neutral</Label>
                  <Input
                    id="vowelHarmony.neutral"
                    placeholder="e.g., ɨ, ə"
                    {...register("vowelHarmony.neutral")}
                    onFocus={() => setActiveIPAField("neutral")}
                  />
                </div>
              </div>
              {errors.vowelHarmony?.front && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.vowelHarmony.front.message}
                </p>
              )}

              {activeIPAField && (
                <div className="flex flex-col items-center mt-4 p-2 border rounded max-w-48 bg-black ">
                  <p className="text-sm font-semibold mx-4 mb-2 text-center">
                    Insert IPA symbol into &quot;{activeIPAField}&quot; field
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {vowels.map((symbol) => (
                      <button
                        key={symbol}
                        type="button"
                        onClick={() => insertSymbol(symbol)}
                        className="w-9 h-9 rounded-md bg-white text-gray-700 hover:bg-teal-100 shadow-sm"
                      >
                        {symbol}
                      </button>
                    ))}
                  </div>
                  <div className="mt-2">
                    <Button
                      type="button"
                      onClick={() => setActiveIPAField(null)}
                    >
                      Close Palette
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Complex Syllable Rules */}
        <div>
          <Label htmlFor="complexSyllableRules">Complex Syllable Rules</Label>
          <Textarea
            id="complexSyllableRules"
            placeholder='e.g., use "()" to denote optional segments and ":" to denote length (e.g., CV(:))'
            {...register("complexSyllableRules")}
          />
        </div>

        <Button type="submit">Submit Rule Set</Button>
      </form>

      <div className="mt-8 border p-4 rounded overflow-x-auto">
        <p className="font-semibold mb-2">Merged Rule Set (JSON):</p>
        <pre className="text-sm">{JSON.stringify(formValues, null, 2)}</pre>
      </div>
    </div>
  );
}
