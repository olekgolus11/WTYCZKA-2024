"use client";
import Clock from "@/components/Clock/Clock";
import Image from "next/image";
import wtyczkaLogo from "../../public/wtyczkaLogo/wtyczka-logo.png";
import { useLanguageModeContext } from "@/contexts/LanguageModeContext";
import Link from "next/link";
import { checkoutMore } from "@/services/socialLinks";
import { useSelectedSectionContext } from "@/contexts/SelectedSectionContext";
import { PARTICIPANT_PAGE } from "@/components/Navbar/NavLinks";
import AnimateWrapper from "@/animations/AnimateWrapper";

export default function Home() {
  const { languageMode } = useLanguageModeContext();
  const { setSelectedSection } = useSelectedSectionContext();
  return (
    <main className="flex flex-wrap items-center justify-around gap-16 px-4 py-6 sm:px-10 xl:px-32 overflow-y-auto">
      <section className="flex flex-col items-center justify-center gap-6">
        <AnimateWrapper duration={1} delay={0.1} type="FadeInBottom">
          <Image
            src={wtyczkaLogo}
            alt="wtyczka Logo"
            priority={true}
            className="min-w-full"
          />
        </AnimateWrapper>
        <AnimateWrapper duration={1} delay={0.2} type="FadeInBottom">
          <h2 className="capitalize font-semibold tracking-wide text-xl text-center">
            {languageMode === "english"
              ? "training and integration trip"
              : "wyjazd integracyjno-szkoleniowy"}
          </h2>
        </AnimateWrapper>
        <div className="flex flex-wrap gap-4 items-center justify-center">
          <AnimateWrapper duration={1} delay={0.4} type="FadeInBottom">
            <Link href={PARTICIPANT_PAGE}>
              <button
                className="button-round button-filled"
                onClick={() => setSelectedSection(0)}
              >
                {languageMode === "english" ? "Sign up" : "Zapisz się"}
              </button>
            </Link>
          </AnimateWrapper>
          <AnimateWrapper duration={1} delay={0.5} type="FadeInBottom">
            <a href={checkoutMore} target="_blank">
              <button className="button-round button-outlined">
                {languageMode === "english"
                  ? "Find out more"
                  : "Dowiedz się więcej"}
              </button>
            </a>
          </AnimateWrapper>
        </div>
      </section>
      <section>
        <Clock />
      </section>
    </main>
  );
}
