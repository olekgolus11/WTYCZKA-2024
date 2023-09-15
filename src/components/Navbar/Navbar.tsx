"use client";
import { MAIN_PAGE } from "./NavLinks";
import { useEffect } from "react";
import Link from "next/link";
import { m } from "framer-motion";
import {
  cardViewportProperties,
  createAnimateOnScroll,
} from "../../animations/animateOnScroll";
import setNavbarHeight from "../../constants/setNavbarHeight";
import useScreenWidth from "@/hooks/useScreenWidth";
import DesktopNavigation from "./DesktopNavigation/DesktopNavigation";
import MobileNavigation from "./MobileNavigation/MobileNavigation";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const mobileNavbarThreshold = 1280;
  const screenWidth = useScreenWidth();
  const pathname = usePathname();

  useEffect(() => {
    setNavbarHeight();
  }, [screenWidth]);

  return (
    <nav className="sticky top-0 w-full z-10 py-4 bg-black" id="navbar">
      <section className="flex items-center justify-around">
        <div>
          <Link href={MAIN_PAGE}>
            <m.h3
              initial="visible"
              whileInView="visible"
              viewport={cardViewportProperties}
              variants={createAnimateOnScroll(0)}
              className="cursor-pointer font-bold tracking-widest uppercase text-2xl hover:text-secondary-color transition-colors duration-300"
            >
              WTYCZKA
            </m.h3>
          </Link>
        </div>
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
