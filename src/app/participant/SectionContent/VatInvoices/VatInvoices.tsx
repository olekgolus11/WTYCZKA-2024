import { useLanguageModeContext } from "@/contexts/LanguageModeContext";
import { VatInvoicesTextEN, VatInvoicesTextPL } from "../textContent";
import TextWithCopyPattern from "@/components/TextWithCopyPattern/TextWithCopyPattern";
import AnimateWrapper from "@/animations/AnimateWrapper";

const VatInvoices = () => {
  const { languageMode } = useLanguageModeContext();
  const usedLanguageText =
    languageMode === "polish" ? VatInvoicesTextPL : VatInvoicesTextEN;
  return (
    <section className="text-xl text-left break-words tracking-wide w-full xl:text-center leading-relaxed">
      <AnimateWrapper duration={1} delay={0.1} type="FadeInTop">
        <TextWithCopyPattern
          text={usedLanguageText.content}
          pattern="@"
          slideIndex={4}
        />
      </AnimateWrapper>
    </section>
  );
};

export default VatInvoices;
