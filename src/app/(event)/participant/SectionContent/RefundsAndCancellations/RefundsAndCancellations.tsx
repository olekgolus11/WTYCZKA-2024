"use client";
import { useLanguageModeContext } from "@/contexts/LanguageModeContext";
import {
  RefundsAndCancellationsTextPL,
  RefundsAndCancellationsTextEN,
} from "../textContent";
import TextWithCopyPattern from "@/components/TextWithCopyPattern/TextWithCopyPattern";
import AnimateWrapper from "@/animations/AnimateWrapper";

const RefundsAndCancellations = () => {
  const { languageMode } = useLanguageModeContext();
  const usedLanguageText =
    languageMode === "polish"
      ? RefundsAndCancellationsTextPL
      : RefundsAndCancellationsTextEN;
  return (
    <section className="text-xl text-left break-words tracking-wide w-full xl:text-center leading-relaxed max-xl:px-2">
      <AnimateWrapper duration={1} delay={0.1} type="FadeInTop">
        {usedLanguageText.content.map((paragraph, index) => (
          <p key={index} className="py-2">
            <TextWithCopyPattern text={paragraph} pattern="@" slideIndex={4} />
          </p>
        ))}
      </AnimateWrapper>
    </section>
  );
};

export default RefundsAndCancellations;
