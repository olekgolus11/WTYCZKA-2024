import { useLanguageModeContext } from "@/contexts/LanguageModeContext";
import { ConsequencesTextEN, ConsequencesTextPL } from "../textContent";

const Consequences = () => {
  const { languageMode } = useLanguageModeContext();
  const usedLanguageText =
    languageMode === "polish" ? ConsequencesTextPL : ConsequencesTextEN;
  return <p className="text-xl text-left tracking-wide w-full xl:text-center">{usedLanguageText.content}</p>;
};

export default Consequences;
