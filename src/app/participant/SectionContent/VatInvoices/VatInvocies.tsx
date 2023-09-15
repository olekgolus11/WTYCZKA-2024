import { useLanguageModeContext } from "@/contexts/LanguageModeContext";
import { VatInvociesTextEN, VatInvociesTextPL } from "../textContent";
import TextWithCopyPattern from "@/components/TextWithCopyPattern/TextWithCopyPattern";

const VatInvocies = () => {
  const { languageMode } = useLanguageModeContext();
  const usedLanguageText =
    languageMode === "polish" ? VatInvociesTextPL : VatInvociesTextEN;
  return (
    <p className="text-xl text-center break-words tracking-wide w-full">
      <TextWithCopyPattern
        text={usedLanguageText.content}
        pattern="@"
        slideIndex={4}
      />
    </p>
  );
};

export default VatInvocies;
