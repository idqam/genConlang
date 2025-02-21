# Frontend UI Overview

This project is a language-generation interface that lets users design a constructed language (conlang) by configuring its grammar, phonology, and symbol-to-phoneme mappings. The UI is divided into several functional areas, each encapsulated in its own React component and connected through a series of context providers.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Component Breakdown](#component-breakdown)
  - [Grammar Configuration](#grammar-configuration)
  - [Phonological Rules Input](#phonological-rules-input)
  - [IPA Symbol Selection and Mapping](#ipa-symbol-selection-and-mapping)
  - [Final Submission](#final-submission)
- [State Management and Contexts](#state-management-and-contexts)
- [Usage Flow](#usage-flow)
- [Development Notes](#development-notes)

---

## Project Structure

The project organizes code into components and context providers. Key files include:

- **Components:**

  - `SendSpecs.tsx` – Collects all user input and bundles data for submission.
  - `GrammarConfigurator.tsx` – Provides an interface for configuring the grammar of the conlang.
  - `IpaButtonGrid.tsx` – Renders a grid of IPA (International Phonetic Alphabet) buttons that allow the user to select symbols.
  - `PhonoRulesForm.tsx` – Allows users to input phonological rules, such as syllable structure and transformation rules.
  - `SymbolMappingForm.tsx` – Provides a form for mapping active IPA symbols to phonemes.

- **Contexts:**
  - `GrammarContext.tsx` – Manages the grammar form state including morphology, word order, noun declensions, etc.
  - `SymbolContext.tsx` – Handles selection (toggling) of IPA symbols as vowels or consonants as well as mapping states.
  - `IpaSymbolContext.tsx` – Separately manages IPA symbol activation, similar to SymbolContext, but tailored for IPA specifics.
  - `MappingContext.tsx` – Manages the mapping between IPA symbols and phonemes, including locking the mapping once submitted.
  - `PhoneRulesContext.tsx` – Manages the phonological rules state including transformation rules, allowed clusters, and vowel harmony settings.

---

## Component Breakdown

### Grammar Configuration

- **GrammarConfigurator.tsx**  
  This component offers two modes for grammar input: a traditional form with multiple rows and a table-based interface.
  - **Inputs:**
    - _Morphology, Word Order, Noun Declensions, Verb Conjugation, Tense/Aspect/Mood_
    - Additional features such as grammatical gender, evidentiality, politeness, negation, and pronoun system are also configurable.
    - Language influences are captured to specify external influences on the conlang.
  - **State Management:**  
     Uses the `GrammarContext` to store and update the submitted grammar data.

### Phonological Rules Input

- **PhonoRulesForm.tsx**  
  This component collects phonological specifications including:
  - Permissible syllables (with examples on how to input optional syllables)
  - Allowed consonant and vowel clusters (using comma-separated inputs)
  - Transformation rules using a defined syntax (with guidelines and examples provided in a scrollable help box)
  - A toggle (via the `IpaSwitchComponent`) that may control further IPA-related settings.

### IPA Symbol Selection and Mapping

- **IpaButtonGrid.tsx**  
  Renders a grid of buttons for IPA symbols. The buttons are generated dynamically based on a provided list of symbols. This grid is typically used for selecting active symbols which then affect other parts of the UI.

- **SymbolMappingForm.tsx**  
  This form allows users to map each active IPA symbol to a phoneme.
  - **Functionality:**
    - It displays the active symbols (combined from vowels and consonants) from the IPA context.
    - Each symbol has an associated input field for the user to specify the mapping.
    - The form checks that every active symbol has a valid mapping before allowing submission.
    - Once submitted, the mapping is locked to prevent accidental changes; however, the user can unlock it to make edits.
  - **State Management:**  
     Uses both the `IpaSymbolContext` (for active symbols) and the `MappingContext` (for mapping and locking functionality).

### Final Submission

- **SendSpecs.tsx**  
  This component acts as the final step in the UI where all the collected configurations are bundled together into a payload:
  - **Data Collected:**
    - **Symbols:** Active vowels and consonants along with their symbol-to-phoneme mapping.
    - **IPA Symbols:** Active IPA vowels and consonants.
    - **Mapping:** Detailed mapping state from `MappingContext`.
    - **Phonology Rules:** Transformation rules, consonant/vowel clusters, and vowel harmony settings.
    - **Grammar:** Grammar data as submitted from the `GrammarConfigurator`.
  - **Submission Process:**  
     The submission logic logs the payload and optionally sends this data to an API endpoint.

---

## State Management and Contexts

The application uses React Contexts extensively to manage state across different parts of the UI:

- **GrammarContext:**  
  Stores the conlang’s grammar settings. The state is updated via `updateSubmittedData` and made available to any component wrapped by the `GrammarProvider`.

- **SymbolContext & IpaSymbolContext:**  
  Both contexts handle the activation (selection) of IPA symbols, distinguishing between vowels and consonants. They provide functions like `toggleSymbol` and state properties for active symbols.

- **MappingContext:**  
  Manages the mapping between selected IPA symbols and their phonemic representations. It includes actions to update mappings and to lock/unlock the mapping state to prevent unwanted changes.

- **PhoneRulesContext:**  
  Provides state management for phonological rules such as transformation rules and cluster configurations. It allows the UI to capture detailed phonological aspects of the conlang.

Each context is designed to be used by its corresponding components, ensuring that state is shared and updated seamlessly across the UI.

---

## Usage Flow

1. **IPA Symbol Selection**  
   Users start by selecting IPA symbols using `IpaButtonGrid.tsx`. This action toggles the symbols in both the IPA and general symbol contexts.

2. **Mapping Symbols**  
   Once symbols are selected, `SymbolMappingForm.tsx` becomes active, allowing the user to map each symbol to a phoneme. The mapping is validated before submission.

3. **Configuring Grammar**  
   The user configures the grammatical structure of the language using `GrammarConfigurator.tsx`.

4. **Setting Phonological Rules**  
   Next, `PhonoRulesForm.tsx` collects detailed phonological rules and transformation rules.

5. **Final Submission**  
   `SendSpecs.tsx` aggregates all data into a payload that can be logged or sent to a backend.

---

---

## Development Notes

- ** Extensibility: **
  The use of contexts and modular components makes it straightforward to extend or modify the UI. New input types or rules can be added by creating additional components and updating the corresponding context.

- ** Submission Logic: **
  The submission functionality in SendSpecs.tsx currently logs the payload. To connect with a backend, uncomment and update the fetch request code.

- ** Validation: **
  Input validation is integrated into forms like the symbol mapping to ensure that all required fields are populated before submission.

- ** Styling and UI: **
  The UI is styled using Tailwind CSS for a clean and modern look. Future improvements could involve adding animations or more interactive elements.

- ** Testing: **
  Unit and integration tests should be implemented for critical components to ensure reliability, especially for input validation and state management logic.

---
