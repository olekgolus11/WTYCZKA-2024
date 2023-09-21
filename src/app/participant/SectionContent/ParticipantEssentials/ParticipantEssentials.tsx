"use client";
import { useLanguageModeContext } from "@/contexts/LanguageModeContext";
import {
  ParticipantEssentialsTextEN,
  ParticipantEssentialsTextPL,
} from "../textContent";
import { Check } from "lucide-react";
import TextWithAnchor from "@/components/TextWithAnchor/TextWithAnchor";
import AnimateWrapper from "@/animations/AnimateWrapper";

const ParticipantEssentials = () => {
  const { languageMode } = useLanguageModeContext();
  const usedLanguageText =
    languageMode === "polish"
      ? ParticipantEssentialsTextPL
      : ParticipantEssentialsTextEN;
  return (
    <>
      <AnimateWrapper
        duration={1}
        delay={0.1}
        type="FadeInTop"
        className="overflow-visible"
      >
        <h2 className="text-3xl text-secondary-color text-center uppercase">
          {usedLanguageText.heading}
        </h2>
      </AnimateWrapper>
      <ul className="list-none text-xl leading-relaxed">
        {usedLanguageText.bulletPoints.map((bulletPoint, index) => (
          <AnimateWrapper
            duration={1}
            delay={0.1 * (index + 1)}
            type="FadeInTop"
            className="flex items-start gap-6 justify-start text-left my-2"
            key={index}
          >
            <Check width={24} height={24} className="min-w-[24px] mt-px" />
            {index === usedLanguageText.bulletLinkIndex ? (
              <TextWithAnchor
                text={bulletPoint}
                href={usedLanguageText.href}
                linkStart={usedLanguageText.linkStart}
                linkEnd={usedLanguageText.linkEnd}
              />
            ) : (
              <span>{bulletPoint}</span>
            )}
          </AnimateWrapper>
        ))}
      </ul>
    </>
  );
};

export default ParticipantEssentials;
