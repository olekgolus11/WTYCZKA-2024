import { useLanguageModeContext } from "@/contexts/LanguageModeContext";
import { headersEN, headersPL } from "./headers";
import { useSelectedSectionContext } from "@/contexts/SelectedSectionContext";

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
          <span
            key={index}
            className={`hover:text-secondary-color cursor-pointer block py-4 whitespace-nowrap h-full ${
              index === selectedSection ? "text-active-color" : "text-white"
            }`}
            onClick={() => setSelectedSection(index)}
          >
            {header}
          </span>
        )
      )}
    </section>
  );
};

export default SectionHeaders;
