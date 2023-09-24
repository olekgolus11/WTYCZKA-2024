"use client";
import { useLanguageModeContext } from "@/contexts/LanguageModeContext";
import { headersEN, headersPL } from "./headers";
import { useSelectedSectionContext } from "@/contexts/SelectedSectionContext";
import AnimateWrapper from "@/animations/AnimateWrapper";

const SectionHeaders = () => {
  const { selectedSection, setSelectedSection } = useSelectedSectionContext();
  const { languageMode } = useLanguageModeContext();
  return (
    <section
      className="scrollable flex items-center gap-8 text-md overflow-x-auto px-8 xl:justify-center"
      id="section-headers"
    >
      {(languageMode == "polish" ? headersPL : headersEN).map(
        (header, index) => (
          <AnimateWrapper
            duration={1}
            delay={0.1 * (index + 1)}
            type="FadeInLeft"
            key={index}
            className="overflow-visible"
            once={true}
          >
            <span
              className={`hover:text-secondary-color cursor-pointer block py-4 whitespace-nowrap h-full ${
                index === selectedSection ? "text-active-color" : "text-white"
              }`}
              onClick={() => setSelectedSection(index)}
            >
              {header}
            </span>
          </AnimateWrapper>
        )
      )}
    </section>
  );
};

export default SectionHeaders;
