"use client";
import { useLanguageModeContext } from "@/contexts/LanguageModeContext";
import { ConsequencesTextEN, ConsequencesTextPL } from "../textContent";
import AnimateWrapper from "@/animations/AnimateWrapper";

const Consequences = () => {
  const { languageMode } = useLanguageModeContext();
  const usedLanguageText =
    languageMode === "polish" ? ConsequencesTextPL : ConsequencesTextEN;
  return (
    <section className="text-xl text-left tracking-wide w-full xl:text-center leading-relaxed max-xl:px-2">
      <AnimateWrapper duration={1} delay={0.1} type="FadeInTop">
        {usedLanguageText.content.map((paragraph, index) => (
          <p className="py-2" key={index}>
            {paragraph}
          </p>
        ))}
      </AnimateWrapper>
    </section>
  );
};

export default Consequences;
