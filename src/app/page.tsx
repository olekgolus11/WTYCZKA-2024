"use client";
import Clock from "@/components/Clock/Clock";
import Image from "next/image";
import wtyczkaLogo from "../../public/wtyczkaLogo/wtyczka-logo.png";
import { useLanguageModeContext } from "@/contexts/LanguageModeContext";

export default function Home() {
  const { languageMode } = useLanguageModeContext();
  return (
    <main className="flex flex-wrap items-center justify-around h-full gap-8 px-10">
      <section className="flex flex-col items-center justify-center gap-6">
        <Image
          src={wtyczkaLogo}
          alt="wtyczka Logo"
          priority={true}
          className="max-w-xs vsm:max-w-xl"
        />
        <h2 className="capitalize font-semibold tracking-wide text-xl text-center">
          {languageMode === "english"
            ? "training and integration trip"
            : "wyjazd integracyjno-szkoleniowy"}
        </h2>
        <div className="flex flex-wrap gap-4 items-center justify-center">
          <button className="button-round button-filled">
            {languageMode === "english" ? "Sign up" : "Zapisz się"}
          </button>
          <button className="button-round button-outlined">
            {languageMode === "english"
              ? "Find out more"
              : "Dowiedz się więcej"}
          </button>
        </div>
      </section>
      <section className="py-8">
        <Clock />
      </section>
    </main>
  );
}
