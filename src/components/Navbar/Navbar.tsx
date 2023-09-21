"use client";
import { MAIN_PAGE } from "./NavLinks";
import { useEffect } from "react";
import Link from "next/link";
import setCustomHeightProperty from "../../constants/setCustomHeightProperty";
import useScreenWidth from "@/hooks/useScreenWidth";
import DesktopNavigation from "./DesktopNavigation/DesktopNavigation";
import MobileNavigation from "./MobileNavigation/MobileNavigation";
import { usePathname } from "next/navigation";
import AnimateWrapper from "@/animations/AnimateWrapper";

const Navbar = () => {
  const mobileNavbarThreshold = 1280;
  const screenWidth = useScreenWidth();
  const pathname = usePathname();

  useEffect(() => {
    setCustomHeightProperty("navbar", "--nav-height");
    setCustomHeightProperty("section-headers", "--section-headers-height");
  }, [screenWidth]);

  return (
    <nav
      className={`sticky top-0 w-full z-10 py-4 ${
        screenWidth > mobileNavbarThreshold
          ? "bg-transparent"
          : "bg-mobile-grey shadow-md shadow-mobile-grey"
      }`}
      id="navbar"
    >
      <section className="flex items-center justify-evenly">
        <AnimateWrapper duration={1} delay={0} type="FadeInLeft">
          <Link
            href={MAIN_PAGE}
            className="cursor-pointer font-bold tracking-widest uppercase text-2xl hover:text-secondary-color transition-colors duration-300"
          >
            WTYCZKA
          </Link>
        </AnimateWrapper>
        {screenWidth > mobileNavbarThreshold ? (
          <DesktopNavigation pathname={pathname} />
        ) : (
          <MobileNavigation pathname={pathname} />
        )}
      </section>
    </nav>
  );
};

export default Navbar;
