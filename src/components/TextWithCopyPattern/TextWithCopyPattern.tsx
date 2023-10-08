"use client";
import { useLanguageModeContext } from "@/contexts/LanguageModeContext";
import copyToClipboard from "@/functions/copyToClipboard";
import removeBorderPunctuation from "@/functions/removeBorderPunctuation";
import useScreenWidth from "@/hooks/useScreenWidth";
import { useState } from "react";

const TextWithCopyPattern = ({
  text,
  pattern,
  slideIndex,
}: {
  text: string;
  pattern: string;
  slideIndex: number;
}) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const { languageMode } = useLanguageModeContext();
  const screenWidth = useScreenWidth();
  return (
    <>
      {text.split(" ").map((word, index) => (
        <span key={index}>
          {word.includes(pattern) ? (
            <>
              <span
                className="underline underline-offset-[6px] cursor-pointer"
                onClick={() => {
                  setIsPopupVisible(true);
                  setTimeout(() => {
                    setIsPopupVisible(false);
                  }, 2000);
                  copyToClipboard(word, removeBorderPunctuation);
                }}
              >
                {word}
              </span>
            </>
          ) : (
            word
          )}{" "}
        </span>
      ))}
      <span
        className={`absolute bg-secondary-color rounded-lg p-2 text-lg transition-all duration-500 ease-in-out shadow-xl shadow-black left-4 ${
          isPopupVisible ? "bottom-4" : "-bottom-16"
        }`}
        style={{ transform: `translateX(${slideIndex * screenWidth}px)` }}
      >
        {languageMode === "polish" ? "Skopiowano" : "Copied"}
      </span>
    </>
  );
};

export default TextWithCopyPattern;
