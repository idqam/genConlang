# app/services/language_processor.py
from app.models.schemas import LanguageSpec

def process_language_spec(language_spec: LanguageSpec) -> dict:
    """
    Process the received language specification.
    """
    # Extract grammar info
    grammar_info = {
        "morphology": language_spec.grammar.morphology,
        "wordOrder": language_spec.grammar.wordOrder,
        "nounCases": language_spec.grammar.nounCases,
        "verbConjugation": language_spec.grammar.verbConjugation,
        "tenseAspectMood": language_spec.grammar.tenseAspectMood
    }

    # Extract phonology rules
    phonology_info = {
        "transformationRules": language_spec.phonologyRules.transformationRules,
        "consonantClusters": language_spec.phonologyRules.consonantClusters,
        "vowelClusters": language_spec.phonologyRules.vowelClusters,
        "vowelHarmony": language_spec.phonologyRules.vowelHarmony.dict()
    }

    # Extract symbol mappings
    mapping_info = {
        "inputMapToPhoneme": language_spec.mapping.inputMapToPhoneme,
        "mappingLocked": language_spec.mapping.mappingLocked
    }

    return {
        "grammar": grammar_info,
        "phonology": phonology_info,
        "symbolMapping": mapping_info
    }
