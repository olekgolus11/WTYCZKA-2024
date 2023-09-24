"use client";
import AnimateWrapper from "@/animations/AnimateWrapper";
import PL_IMG from "../../../public/languageIcons/poland.png";
import EN_IMG from "../../../public/languageIcons/united-kingdom.png";
import { useLanguageModeContext } from "../../contexts/LanguageModeContext";
import Image from "next/image";

const LanguageSwitch = ({ className }: { className?: string }) => {
  const { languageMode, setLanguageMode } = useLanguageModeContext();
  const toggleLanguageMode = () => {
    setLanguageMode((prevLanguage) =>
      prevLanguage === "polish" ? "english" : "polish"
    );
  };
  return (
    <AnimateWrapper duration={1} delay={0.7} type="FadeInLeft">
      <div
        className={`cursor-pointer flex ${className}`}
        onClick={toggleLanguageMode}
      >
        <Image
          src={languageMode === "polish" ? EN_IMG : PL_IMG}
          width={30}
          height={30}
          alt="language-switch-icon"
        />
      </div>
    </AnimateWrapper>
  );
};

export default LanguageSwitch;
