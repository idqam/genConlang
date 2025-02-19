from pydantic import BaseModel
from typing import List, Dict

# Symbol-related data
class Symbols(BaseModel):
    activeVowels: List[str]
    activeConsonants: List[str]
    inputMapToPhoneme: Dict[str, str]

class IPASymbols(BaseModel):
    ipaVowels: List[str]
    ipaConsonants: List[str]

class Mapping(BaseModel):
    inputMapToPhoneme: Dict[str, str]
    mappingLocked: bool

# Phonological rules
class VowelHarmony(BaseModel):
    isEnabled: bool
    inputs: Dict[str, List[str]]  # Expected keys: 'front', 'back', 'neutral'

class PhonologyRules(BaseModel):
    transformationRules: str
    consonantClusters: str
    vowelClusters: str
    vowelHarmony: VowelHarmony

# Grammar specifications
class AdditionalFeatures(BaseModel):
    grammaticalGender: str
    evidentiality: str
    politeness: str
    negation: str
    pronounSystem: str

class LanguageInfluences(BaseModel):
    influencedBy: str
    akinTo: str

class Grammar(BaseModel):
    morphology: str
    wordOrder: str
    nounCases: str
    verbConjugation: str
    tenseAspectMood: str
    additionalFeatures: AdditionalFeatures
    languageInfluences: LanguageInfluences

# Full payload schema
class LanguageSpec(BaseModel):
    symbols: Symbols
    ipaSymbols: IPASymbols
    mapping: Mapping
    phonologyRules: PhonologyRules
    grammar: Grammar
