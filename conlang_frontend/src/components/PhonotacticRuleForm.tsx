import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

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

const phonotacticRuleSchema = z
  .object({
    permissibleSyllables: z.array(syllableSchema).default([]),
    transformationRules: z.array(transformationSchema).default([]),
    allowedConsonantClusters: z.array(clusterSchema).default([]),
    allowedVowelClusters: z.array(clusterSchema).default([]),
    vowelHarmonyEnabled: z.boolean().default(false),
    vowelHarmonyRules: z.string().optional(),
    complexSyllableRules: z.string().optional(),
  })
  .refine(
    (data) =>
      !data.vowelHarmonyEnabled ||
      (data.vowelHarmonyRules && data.vowelHarmonyRules.trim().length > 0),
    {
      message: "Vowel harmony rules required when vowel harmony is enabled",
      path: ["vowelHarmonyRules"],
    }
  );

type PhonotacticRule = z.infer<typeof phonotacticRuleSchema>;

export default function PhonotacticRuleForm() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<PhonotacticRule>({
    resolver: zodResolver(phonotacticRuleSchema),
    defaultValues: {
      permissibleSyllables: [],
      transformationRules: [],
      allowedConsonantClusters: [],
      allowedVowelClusters: [],
      vowelHarmonyEnabled: false,
      vowelHarmonyRules: "",
      complexSyllableRules: "",
    },
  });

  const {
    fields: syllableFields,
    append: appendSyllable,
    remove: removeSyllable,
  } = useFieldArray({
    control,
    name: "permissibleSyllables",
  });

  const {
    fields: transformationFields,
    append: appendTransformation,
    remove: removeTransformation,
  } = useFieldArray({
    control,
    name: "transformationRules",
  });

  const {
    fields: consonantFields,
    append: appendConsonant,
    remove: removeConsonant,
  } = useFieldArray({
    control,
    name: "allowedConsonantClusters",
  });

  const {
    fields: vowelFields,
    append: appendVowel,
    remove: removeVowel,
  } = useFieldArray({
    control,
    name: "allowedVowelClusters",
  });

  const [newSyllable, setNewSyllable] = useState("");
  const [newTransformationCondition, setNewTransformationCondition] =
    useState("");
  const [newTransformationValue, setNewTransformationValue] = useState("");
  const [newConsonantCluster, setNewConsonantCluster] = useState("");
  const [newVowelCluster, setNewVowelCluster] = useState("");

  const [currentRules, setCurrentRules] = useState<PhonotacticRule[]>([]);

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

  const onSubmit = (data: PhonotacticRule) => {
    setCurrentRules([...currentRules, data]);
    reset();
  };

  return (
    <div className="p-8 border rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="syllableInput">Permissible Syllables</Label>
          <div className="flex gap-2">
            <Input
              id="syllableInput"
              placeholder="e.g., CVC, (C)V(C), CV:"
              value={newSyllable}
              onChange={(e) => setNewSyllable(e.target.value)}
            />
            <Button type="button" onClick={addSyllable}>
              Add Syllable
            </Button>
          </div>
          <div>
            {syllableFields.map((field, index) => (
              <div key={field.id} className="flex items-center justify-between">
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
                  className="flex items-center justify-between border-b pb-1"
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
              <div key={field.id} className="flex items-center justify-between">
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
              <div key={field.id} className="flex items-center justify-between">
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

        <div>
          <div className="flex items-center gap-3">
            <Label htmlFor="vowelHarmonyEnabled">Enable Vowel Harmony?</Label>
            <Switch
              id="vowelHarmonyEnabled"
              {...register("vowelHarmonyEnabled")}
            />
          </div>
          {errors.vowelHarmonyRules && (
            <p className="text-red-500 text-sm">
              {errors.vowelHarmonyRules.message}
            </p>
          )}
          <div className="mt-2">
            <Label htmlFor="vowelHarmonyRules">Vowel Harmony Rules</Label>
            <Textarea
              id="vowelHarmonyRules"
              placeholder="e.g., vowels in a word must agree in backness"
              {...register("vowelHarmonyRules")}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="complexSyllableRules">Complex Syllable Rules</Label>
          <Textarea
            id="complexSyllableRules"
            placeholder='e.g., use "()" to denote optional segments and ":" to denote length (e.g., CV(:))'
            {...register("complexSyllableRules")}
          />
        </div>

        <Button type="submit">Add Rule Set</Button>
      </form>

      <div className="mt-8 border p-4 rounded overflow-y-auto max-h-60">
        <p className="font-semibold mb-2">Current Rule Set (JSON):</p>
        <pre className="text-sm">{JSON.stringify(currentRules, null, 2)}</pre>
      </div>
    </div>
  );
}
