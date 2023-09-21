import NavIcon from "@/customIcons/NavIcon/NavIcon";
import Link from "next/link";
import Controls from "../Controls/Controls";
import { navLinksPL, navLinksEN } from "../NavLinks";
import { useState } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import { useLanguageModeContext } from "@/contexts/LanguageModeContext";
import AnimateWrapper from "@/animations/AnimateWrapper";

const MobileNavigation = ({ pathname }: { pathname: string }) => {
  const { languageMode } = useLanguageModeContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuToggle = () => {
    setIsMenuOpen((prevValue) => !prevValue);
  };
  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };
  const menuRef = useClickOutside(handleMenuClose);

  return (
    <div ref={menuRef}>
      <AnimateWrapper duration={1} delay={0.1} type="FadeInLeft">
        <div onClick={handleMenuToggle}>
          <NavIcon iconState={isMenuOpen} />
        </div>
      </AnimateWrapper>
      <div
        className={`absolute ${
          isMenuOpen ? "top-full opacity-100" : "-top-60 opacity-0"
        } transition-all duration-500 bg-mobile-grey w-full flex items-center justify-center flex-col gap-4 py-4 origin-top -z-10 left-0 overflow-hidden`}
      >
        {(languageMode == "polish" ? navLinksPL : navLinksEN).map(
          (navLink, index) => (
            <AnimateWrapper
              duration={1}
              delay={0.1}
              type="FadeInLeft"
              key={index}
              className={`hover:text-secondary-color transition-colors duration-300 text-base w-full text-center ${
                pathname === navLink.href ? "text-active-color" : "text-white"
              }`}
            >
              {navLink.isInternal ? (
                <Link
                  href={navLink.href}
                  className="text-xl block"
                  onClick={handleMenuClose}
                >
                  {navLink.title}
                </Link>
              ) : (
                <a
                  href={navLink.href}
                  target="_blank"
                  className="text-xl block"
                  onClick={handleMenuClose}
                >
                  {navLink.title}
                </a>
              )}
            </AnimateWrapper>
          )
        )}
        <Controls />
      </div>
    </div>
  );
};

export default MobileNavigation;
