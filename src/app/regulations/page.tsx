"use client";
import TextWithAnchor from "@/components/TextWithAnchor/TextWithAnchor";
import { useLanguageModeContext } from "@/contexts/LanguageModeContext";
import { RegulationsTextEN, RegulationsTextPL } from "./textContent";
import { useEffect } from "react";
import { REGULATIONS } from "@/services/regulations";
import { Typography } from "@mui/material";
import AnimateWrapper from "@/animations/AnimateWrapper";

export default function Regulations() {
  const { languageMode } = useLanguageModeContext();
  const usedLanguageText =
    languageMode === "polish" ? RegulationsTextPL : RegulationsTextEN;

  useEffect(() => {
    window.open(REGULATIONS, "_blank");
  }, []);

  return (
    <main className="text-center flex items-center justify-center px-4 py-6 text-primary-color sm:px-10 xl:px-32">
      <AnimateWrapper duration={1} delay={0.3} type="FadeInBottom">
        <Typography variant="h5">
          <TextWithAnchor
            text={usedLanguageText.content}
            href={usedLanguageText.href}
            linkStart={usedLanguageText.linkStart}
            linkEnd={usedLanguageText.linkEnd}
          />
        </Typography>
      </AnimateWrapper>
    </main>
  );
}
