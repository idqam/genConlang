"use client";
import { useEffect, useState } from "react";
import { IntroButton } from "./IntroButton";

type Props = {
  waitFor?: number;
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

const ButtonLoad = ({ trigger }: { trigger: boolean }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (trigger) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return (
    <div
      className={`transition-opacity duration-1000 ${
        isLoaded ? "opacity-100" : "opacity-0"
      } flex justify-center`}
      style={{ height: "60px" }}
    >
      {isLoaded && (
        <div className="flex flex-row space-x-24 items-center">
          <IntroButton text="Log in" />
          <IntroButton text="Dive In" />
        </div>
      )}
    </div>
  );
};

const GenTypingText = ({
  waitFor,
  onComplete,
}: Props & { onComplete: () => void }) => {
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
      <h1 className="text-white text-2xl">{baseTextTyped}</h1>
      <h1 className="text-blue-500 text-2xl">
        {isBaseTextComplete ? currentWord : ""}
      </h1>
    </div>
  );
};

export const LandingContainer = () => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [isFinalTextComplete, setIsFinalTextComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen flex justify-center items-center p-0">
      <div className="h-auto w-auto border-2 p-24 ">
        <div className="flex flex-col items-center space-y-8">
          <h1
            className={`transition-opacity duration-1000 ${
              showWelcome ? "opacity-100" : "opacity-0"
            } text-8xl font-bold text-white text-center`}
          >
            WELCOME
          </h1>

          <div className="h-10 flex items-center">
            <GenTypingText
              waitFor={1000}
              onComplete={() => setIsFinalTextComplete(true)}
            />
          </div>

          <ButtonLoad trigger={isFinalTextComplete} />
        </div>
      </div>
    </div>
  );
};
