"use client";
import { useEffect, useState } from "react";
import { IntroButton } from "./IntroButton";

type Props = {
  trigger: boolean;
};

export const ButtonLoad = ({ trigger }: Props) => {
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
          <IntroButton location="/conlang" text="Dive In" />
        </div>
      )}
    </div>
  );
};
