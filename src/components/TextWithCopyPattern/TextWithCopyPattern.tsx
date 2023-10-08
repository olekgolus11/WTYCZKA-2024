"use client";
import copyToClipboard from "@/functions/copyToClipboard";
import removeBorderPunctuation from "@/functions/removeBorderPunctuation";
import { useState } from "react";
import CopyToast from "./CopyToast";

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
      <CopyToast
        slideIndex={slideIndex}
        isPopupVisible={isPopupVisible}
        setIsPopupVisible={setIsPopupVisible}
      />
    </>
  );
};

export default TextWithCopyPattern;
