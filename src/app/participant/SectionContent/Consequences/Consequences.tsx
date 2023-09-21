import { useLanguageModeContext } from "@/contexts/LanguageModeContext";
import { ConsequencesTextEN, ConsequencesTextPL } from "../textContent";
import AnimateWrapper from "@/animations/AnimateWrapper";

const Consequences = () => {
  const { languageMode } = useLanguageModeContext();
  const usedLanguageText =
    languageMode === "polish" ? ConsequencesTextPL : ConsequencesTextEN;
  return (
    <section className="text-xl text-left tracking-wide w-full xl:text-center leading-relaxed">
      <AnimateWrapper duration={1} delay={0.1} type="FadeInTop">
        {usedLanguageText.content}
      </AnimateWrapper>
    </section>
  );
};

export default Consequences;
