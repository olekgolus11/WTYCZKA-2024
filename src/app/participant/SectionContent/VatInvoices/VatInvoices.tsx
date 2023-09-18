import { useLanguageModeContext } from "@/contexts/LanguageModeContext";
import { VatInvoicesTextEN, VatInvoicesTextPL } from "../textContent";
import TextWithCopyPattern from "@/components/TextWithCopyPattern/TextWithCopyPattern";

const VatInvoices = () => {
  const { languageMode } = useLanguageModeContext();
  const usedLanguageText =
    languageMode === "polish" ? VatInvoicesTextPL : VatInvoicesTextEN;
  return (
    <p className="text-xl text-left break-words tracking-wide w-full xl:text-center">
      <TextWithCopyPattern
        text={usedLanguageText.content}
        pattern="@"
        slideIndex={4}
      />
    </p>
  );
};

export default VatInvoices;
