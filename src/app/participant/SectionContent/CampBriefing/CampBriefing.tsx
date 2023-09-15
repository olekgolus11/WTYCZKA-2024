import { useLanguageModeContext } from "@/contexts/LanguageModeContext";
import { CampBriefingTextPL, CampBriefingTextEN } from "../textContent";
import TextWithAnchor from "@/components/TextWithAnchor/TextWithAnchor";

const CampBriefing = () => {
  const { languageMode } = useLanguageModeContext();
  const usedLanguageText =
    languageMode === "polish" ? CampBriefingTextPL : CampBriefingTextEN;
  return (
    <>
      <h2 className="text-3xl text-secondary-color text-center uppercase">
        {usedLanguageText.date}
      </h2>
      <h3 className="text-2xl text-center">
        <TextWithAnchor
          text={usedLanguageText.heading}
          href={usedLanguageText.href}
          linkStart={usedLanguageText.linkStart}
          linkEnd={usedLanguageText.linkEnd}
        />
      </h3>
      <p className="text-center text-xl">{usedLanguageText.content}</p>
    </>
  );
};

export default CampBriefing;
