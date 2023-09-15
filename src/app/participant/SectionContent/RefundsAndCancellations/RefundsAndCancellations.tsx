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
    <p className="text-xl text-center break-words tracking-wide w-full">
      <TextWithCopyPattern
        text={usedLanguageText.content}
        pattern="@"
        slideIndex={5}
      />
    </p>
  );
};

export default RefundsAndCancellations;
