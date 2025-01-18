"use client";
import { useEffect, useState } from "react";
import { GenTypingText } from "./GenTypingText";
import { ButtonLoad } from "./ButtonLoad";

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
      <div className="h-auto w-auto p-24">
        <div className="flex flex-col items-center space-y-8">
          <h1
            className={`transition-opacity duration-1000 ${
              showWelcome ? "opacity-100" : "opacity-0"
            } text-8xl font-bold text-blue text-center`}
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
