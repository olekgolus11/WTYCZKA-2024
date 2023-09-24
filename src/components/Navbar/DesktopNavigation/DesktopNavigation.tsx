"use client";
import { ArrowRight } from "lucide-react";
import Controls from "../Controls/Controls";
import { navLinksPL, navLinksEN, PARTICIPANT_PAGE } from "../NavLinks";
import { useLanguageModeContext } from "@/contexts/LanguageModeContext";
import Link from "next/link";
import { useSelectedSectionContext } from "@/contexts/SelectedSectionContext";
import AnimateWrapper from "@/animations/AnimateWrapper";

const DesktopNavigation = ({ pathname }: { pathname: string }) => {
  const { languageMode } = useLanguageModeContext();
  const { setSelectedSection } = useSelectedSectionContext();
  return (
    <>
      <div className="flex gap-6 text-base">
        {(languageMode == "polish" ? navLinksPL : navLinksEN).map(
          (navLink, index) => (
            <AnimateWrapper
              duration={1}
              delay={0.1 * (index + 1)}
              type="FadeInLeft"
              key={index}
              className={`hover:text-secondary-color transition-colors duration-300 ${
                pathname === navLink.href ? "text-active-color" : "text-white"
              }`}
            >
              {navLink.isInternal ? (
                <Link href={navLink.href}>{navLink.title}</Link>
              ) : (
                <a href={navLink.href} target="_blank">
                  {navLink.title}
                </a>
              )}
            </AnimateWrapper>
          )
        )}
      </div>
      <div className="flex items-center justify-center gap-6">
        <Controls />
        <AnimateWrapper duration={1} delay={0.8} type="FadeInLeft">
          <Link href={PARTICIPANT_PAGE}>
            <button
              className="button-square button-filled flex gap-2 group"
              onClick={() => setSelectedSection(0)}
            >
              <span>{languageMode == "polish" ? "Zapisz się" : "Sign up"}</span>
              <ArrowRight className="group-hover:animate-spring-right" />
            </button>
          </Link>
        </AnimateWrapper>
      </div>
    </>
  );
};

export default DesktopNavigation;
