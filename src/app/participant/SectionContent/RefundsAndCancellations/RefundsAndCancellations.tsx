import { useLanguageModeContext } from "@/contexts/LanguageModeContext";
import {
  RefundsAndCancellationsTextPL,
  RefundsAndCancellationsTextEN,
} from "../textContent";
import TextWithCopyPattern from "@/components/TextWithCopyPattern/TextWithCopyPattern";

const RefundsAndCancellations = () => {
  const { languageMode } = useLanguageModeContext();
  const usedLanguageText =
    languageMode === "polish"
      ? RefundsAndCancellationsTextPL
      : RefundsAndCancellationsTextEN;
  return (
    <p className="text-xl text-left break-words tracking-wide w-full xl:text-center">
      <TextWithCopyPattern
        text={usedLanguageText.content}
        pattern="@"
        slideIndex={5}
      />
    </p>
  );
};

export default RefundsAndCancellations;
