import {
  GrammarFormData,
  initialGrammarFormData,
  useGrammarContext,
  AdditionalFeatures,
  LanguageInfluences,
} from "@/app/context/GrammarContext";
import React, { useState } from "react";

const GrammarConfigurator = () => {
  const [localFormData, setLocalFormData] = useState<GrammarFormData>(
    initialGrammarFormData
  );
  const [useTable, setUseTable] = useState(false);

  const { updateSubmittedData } = useGrammarContext();

  const handleSubmit = () => {
    updateSubmittedData(localFormData);
    console.log("Submitted Data:", localFormData);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 font-sans text-black">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">
          {!useTable ? "Grammar Specifier" : "Grammar Table"}
        </h1>
        <button
          onClick={() => setUseTable(!useTable)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {useTable ? "Switch to Row Input" : "Switch to Table Input"}
        </button>
      </div>
      {useTable ? (
        <GrammarTableInput
          formData={localFormData}
          setFormData={setLocalFormData}
        />
      ) : (
        <div className="border-2 rounded-xl p-2">
          <div className="grid grid-cols-3 gap-2">
            <MorphologyInput
              formData={localFormData}
              setFormData={setLocalFormData}
            />
            <WordOrderInput
              formData={localFormData}
              setFormData={setLocalFormData}
            />
            <NounDeclensionsInput
              formData={localFormData}
              setFormData={setLocalFormData}
            />
            <VerbConjugationInput
              formData={localFormData}
              setFormData={setLocalFormData}
            />
            <TenseAspectMoodInput
              formData={localFormData}
              setFormData={setLocalFormData}
            />
            <AdditionalFeaturesInput
              formData={localFormData}
              setFormData={setLocalFormData}
            />
            <LanguageInfluencesInput
              formData={localFormData}
              setFormData={setLocalFormData}
            />
          </div>
        </div>
      )}
      <div className="mt-4">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

interface Props {
  formData: GrammarFormData;
  setFormData: React.Dispatch<React.SetStateAction<GrammarFormData>>;
}

const MorphologyInput: React.FC<Props> = ({ formData, setFormData }) => (
  <div className="min-w-[300px] p-4 border rounded shadow bg-zinc-400">
    <h2 className="text-xl font-semibold mb-2">Morphological Typology</h2>
    <p className="text-sm mb-2">
      Choose the type of morphology (e.g., Isolating, Agglutinative, Fusional,
      Polysynthetic).
    </p>
    <textarea
      placeholder="e.g., Agglutinative with some fusional elements"
      value={formData.morphology}
      onChange={(e) => setFormData({ ...formData, morphology: e.target.value })}
      className="w-full p-2 h-40 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
    />
  </div>
);

const WordOrderInput: React.FC<Props> = ({ formData, setFormData }) => (
  <div className="min-w-[300px] p-4 border rounded shadow bg-zinc-400">
    <h2 className="text-xl font-semibold mb-2">Word Order</h2>
    <p className="text-sm mb-2">
      Specify the default word order (e.g., SVO, SOV, VSO, Flexible).
    </p>
    <textarea
      placeholder="e.g., SOV with occasional VSO in questions"
      value={formData.wordOrder}
      onChange={(e) => setFormData({ ...formData, wordOrder: e.target.value })}
      className="w-full p-2 h-40 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
    />
  </div>
);

const NounDeclensionsInput: React.FC<Props> = ({ formData, setFormData }) => (
  <div className="min-w-[300px] p-4 border rounded shadow bg-zinc-400">
    <h2 className="text-xl font-semibold mb-2">Noun Declensions &amp; Cases</h2>
    <p className="text-sm mb-2">
      Define the case system (e.g., None, Minimal, Moderate, Rich—such as 5
      cases: nominative, accusative, etc.).
    </p>
    <textarea
      placeholder="e.g., 5 cases: Nominative, Accusative, Dative, Genitive, Locative"
      value={formData.nounCases}
      onChange={(e) => setFormData({ ...formData, nounCases: e.target.value })}
      className="w-full p-2 h-40 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
    />
  </div>
);

const VerbConjugationInput: React.FC<Props> = ({ formData, setFormData }) => (
  <div className="min-w-[300px] p-4 border rounded shadow bg-zinc-400">
    <h2 className="text-xl font-semibold mb-2">Verb Conjugation</h2>
    <p className="text-sm mb-2">
      Choose how verbs conjugate (e.g., No conjugation, Regular, Highly
      Inflected, Polysynthetic).
    </p>
    <textarea
      placeholder="e.g., Regular conjugation with aspect markers"
      value={formData.verbConjugation}
      onChange={(e) =>
        setFormData({ ...formData, verbConjugation: e.target.value })
      }
      className="w-full p-2 h-40 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
    />
  </div>
);

const TenseAspectMoodInput: React.FC<Props> = ({ formData, setFormData }) => (
  <div className="min-w-[300px] p-4 border rounded shadow bg-zinc-400">
    <h2 className="text-xl font-semibold mb-2">Tense / Aspect / Mood</h2>
    <p className="text-sm mb-2">
      Define how your conlang marks tense, aspect, and mood (e.g., use separate
      aspect markers instead of tense).
    </p>
    <textarea
      placeholder="e.g., Separate aspect markers instead of tense"
      value={formData.tenseAspectMood}
      onChange={(e) =>
        setFormData({ ...formData, tenseAspectMood: e.target.value })
      }
      className="w-full p-2 h-40 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
    />
  </div>
);

const AdditionalFeaturesInput: React.FC<Props> = ({
  formData,
  setFormData,
}) => {
  const handleChange = (field: keyof AdditionalFeatures, value: string) => {
    setFormData({
      ...formData,
      additionalFeatures: { ...formData.additionalFeatures, [field]: value },
    });
  };

  return (
    <div className="min-w-[300px] p-4 border rounded shadow bg-zinc-400">
      <h2 className="text-xl font-semibold mb-2">Additional Features</h2>
      <p className="text-sm mb-2">
        Specify extra aspects such as Grammatical Gender, Evidentiality,
        Politeness/Honorifics, Negation, and Pronoun System.
      </p>
      <div className="space-y-2 flex flex-col">
        <input
          type="text"
          placeholder="Grammatical Gender (e.g., None, 2-class)"
          value={formData.additionalFeatures.grammaticalGender}
          onChange={(e) => handleChange("grammaticalGender", e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Evidentiality (e.g., 3-level evidential)"
          value={formData.additionalFeatures.evidentiality}
          onChange={(e) => handleChange("evidentiality", e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Politeness/Honorific System (e.g., formal/informal distinctions)"
          value={formData.additionalFeatures.politeness}
          onChange={(e) => handleChange("politeness", e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Negation Marking (e.g., prefix, suffix)"
          value={formData.additionalFeatures.negation}
          onChange={(e) => handleChange("negation", e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Pronoun System (e.g., inclusive/exclusive distinctions)"
          value={formData.additionalFeatures.pronounSystem}
          onChange={(e) => handleChange("pronounSystem", e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>
    </div>
  );
};

const LanguageInfluencesInput: React.FC<Props> = ({
  formData,
  setFormData,
}) => {
  const handleChange = (field: keyof LanguageInfluences, value: string) => {
    setFormData({
      ...formData,
      languageInfluences: { ...formData.languageInfluences, [field]: value },
    });
  };

  return (
    <div className="min-w-[300px] p-4 border rounded shadow bg-zinc-400">
      <h2 className="text-xl font-semibold mb-2">Language Influences</h2>
      <p className="text-sm mb-2">
        Specify languages that influence your conlang or that it is akin to.
      </p>
      <input
        type="text"
        placeholder="Influenced by (e.g., Latin, Japanese)"
        value={formData.languageInfluences.influencedBy}
        onChange={(e) => handleChange("influencedBy", e.target.value)}
        className="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
      />
      <input
        type="text"
        placeholder="Akin to (e.g., Turkish, Esperanto)"
        value={formData.languageInfluences.akinTo}
        onChange={(e) => handleChange("akinTo", e.target.value)}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
      />
    </div>
  );
};

const GrammarTableInput: React.FC<Props> = ({ formData, setFormData }) => {
  const updateField = (field: keyof GrammarFormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const updateNestedField = (
    parent: "additionalFeatures" | "languageInfluences",
    field: string,
    value: string
  ) => {
    setFormData({
      ...formData,
      [parent]: {
        ...formData[parent],
        [field]: value,
      },
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Aspect</th>
            <th className="border px-4 py-2">Description / Options</th>
            <th className="border px-4 py-2">User Input</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">Morphology</td>
            <td className="border px-4 py-2">
              Isolating, Agglutinative, Fusional, Polysynthetic
            </td>
            <td className="border px-4 py-2">
              <input
                type="text"
                placeholder="e.g., Agglutinative with some fusional elements"
                value={formData.morphology}
                onChange={(e) => updateField("morphology", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
              />
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Word Order</td>
            <td className="border px-4 py-2">SVO, SOV, VSO, Flexible</td>
            <td className="border px-4 py-2">
              <input
                type="text"
                placeholder="e.g., SOV with occasional VSO"
                value={formData.wordOrder}
                onChange={(e) => updateField("wordOrder", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
              />
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Noun Cases</td>
            <td className="border px-4 py-2">None, Minimal, Moderate, Rich</td>
            <td className="border px-4 py-2">
              <input
                type="text"
                placeholder="e.g., 5 cases: Nom, Acc, Dat, Gen, Loc"
                value={formData.nounCases}
                onChange={(e) => updateField("nounCases", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
              />
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Verb Conjugation</td>
            <td className="border px-4 py-2">
              None, Regular, Highly Inflected, Polysynthetic
            </td>
            <td className="border px-4 py-2">
              <input
                type="text"
                placeholder="e.g., Regular with aspect markers"
                value={formData.verbConjugation}
                onChange={(e) => updateField("verbConjugation", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
              />
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Tense/Aspect/Mood</td>
            <td className="border px-4 py-2">
              How Tense, Aspect, and Mood are marked
            </td>
            <td className="border px-4 py-2">
              <input
                type="text"
                placeholder="e.g., Separate aspect markers instead of tense"
                value={formData.tenseAspectMood}
                onChange={(e) => updateField("tenseAspectMood", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
              />
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Grammatical Gender</td>
            <td className="border px-4 py-2">e.g., None, 2-class, 3-class</td>
            <td className="border px-4 py-2">
              <input
                type="text"
                placeholder="e.g., None"
                value={formData.additionalFeatures.grammaticalGender}
                onChange={(e) =>
                  updateNestedField(
                    "additionalFeatures",
                    "grammaticalGender",
                    e.target.value
                  )
                }
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
              />
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Evidentiality</td>
            <td className="border px-4 py-2">Levels of evidentiality</td>
            <td className="border px-4 py-2">
              <input
                type="text"
                placeholder="e.g., 3 levels"
                value={formData.additionalFeatures.evidentiality}
                onChange={(e) =>
                  updateNestedField(
                    "additionalFeatures",
                    "evidentiality",
                    e.target.value
                  )
                }
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
              />
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Politeness/Honorifics</td>
            <td className="border px-4 py-2">Details of a politeness system</td>
            <td className="border px-4 py-2">
              <input
                type="text"
                placeholder="e.g., Honorific suffixes"
                value={formData.additionalFeatures.politeness}
                onChange={(e) =>
                  updateNestedField(
                    "additionalFeatures",
                    "politeness",
                    e.target.value
                  )
                }
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
              />
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Negation Marking</td>
            <td className="border px-4 py-2">
              Prefix, suffix, or separate word
            </td>
            <td className="border px-4 py-2">
              <input
                type="text"
                placeholder="e.g., Suffix"
                value={formData.additionalFeatures.negation}
                onChange={(e) =>
                  updateNestedField(
                    "additionalFeatures",
                    "negation",
                    e.target.value
                  )
                }
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
              />
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Pronoun System</td>
            <td className="border px-4 py-2">
              Features like inclusive/exclusive distinctions
            </td>
            <td className="border px-4 py-2">
              <input
                type="text"
                placeholder="e.g., Inclusive/exclusive distinction"
                value={formData.additionalFeatures.pronounSystem}
                onChange={(e) =>
                  updateNestedField(
                    "additionalFeatures",
                    "pronounSystem",
                    e.target.value
                  )
                }
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
              />
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Influenced By</td>
            <td className="border px-4 py-2">
              Languages that influence your conlang
            </td>
            <td className="border px-4 py-2">
              <input
                type="text"
                placeholder="e.g., Latin, Japanese"
                value={formData.languageInfluences.influencedBy}
                onChange={(e) =>
                  updateNestedField(
                    "languageInfluences",
                    "influencedBy",
                    e.target.value
                  )
                }
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
              />
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Akin To</td>
            <td className="border px-4 py-2">
              Languages your conlang is akin to
            </td>
            <td className="border px-4 py-2">
              <input
                type="text"
                placeholder="e.g., Turkish, Esperanto"
                value={formData.languageInfluences.akinTo}
                onChange={(e) =>
                  updateNestedField(
                    "languageInfluences",
                    "akinTo",
                    e.target.value
                  )
                }
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default GrammarConfigurator;
