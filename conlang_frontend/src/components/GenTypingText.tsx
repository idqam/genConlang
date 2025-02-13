"use client";
import { useEffect, useState } from "react";

type Props = {
  waitFor?: number;
  onComplete: () => void;
};

const TYPING_SPEED = 50;
const WORD_CYCLE_DELAY = 1000;
const WORDS = [
  "Languages",
  "Phoneme Systems",
  "Syntax Rules",
  "Grammars",
  "Conlangs",
];

export const GenTypingText = ({ waitFor = 0, onComplete }: Props) => {
  const [baseTextTyped, setBaseTextTyped] = useState("");
  const [currentWord, setCurrentWord] = useState("Conlang");
  const [isBaseTextComplete, setIsBaseTextComplete] = useState(false);
  const [cyclingIndex, setCyclingIndex] = useState(0);

  const baseText = "Start generating your own ";

  useEffect(() => {
    const timer = setTimeout(() => {
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        setBaseTextTyped(baseText.slice(0, currentIndex + 1));
        currentIndex++;
        if (currentIndex >= baseText.length) {
          clearInterval(typingInterval);
          setIsBaseTextComplete(true);
        }
      }, TYPING_SPEED);
    }, waitFor);

    return () => clearTimeout(timer);
  }, [waitFor]);

  useEffect(() => {
    if (isBaseTextComplete && cyclingIndex < WORDS.length) {
      const wordCycleTimer = setTimeout(() => {
        setCurrentWord(WORDS[cyclingIndex]);
        setCyclingIndex((prevIndex) => prevIndex + 1);

        if (cyclingIndex === WORDS.length - 1) {
          onComplete();
        }
      }, WORD_CYCLE_DELAY);

      return () => clearTimeout(wordCycleTimer);
    }
  }, [isBaseTextComplete, cyclingIndex, onComplete]);

  return (
    <div
      className={`transition-opacity duration-1000 ${
        isBaseTextComplete ? "opacity-100" : "opacity-0"
      } flex flex-row space-x-1 justify-center`}
    >
      <h1 className="text-red text-2xl">{baseTextTyped}</h1>
      <h1 className="text-blue-500 text-2xl">
        {isBaseTextComplete ? currentWord : ""}
      </h1>
    </div>
  );
};
