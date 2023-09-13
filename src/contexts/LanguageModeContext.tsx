"use client";
import { createContext, useContext, Dispatch, useState } from "react";

interface LanguageModeContextInterface {
  languageMode: "polish" | "english";
  setLanguageMode: Dispatch<React.SetStateAction<"polish" | "english">>;
}

const LanguageModeContext = createContext<LanguageModeContextInterface>({
  languageMode: "polish",
  setLanguageMode: () => {},
});

export const LanguageModeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [languageMode, setLanguageMode] = useState<"polish" | "english">(
    "polish"
  );
  return (
    <LanguageModeContext.Provider value={{ languageMode, setLanguageMode }}>
      {children}
    </LanguageModeContext.Provider>
  );
};

export const useLanguageModeContext = () => useContext(LanguageModeContext);
