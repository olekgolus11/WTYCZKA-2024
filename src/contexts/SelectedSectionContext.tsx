"use client";
import { createContext, useContext, Dispatch, useState } from "react";

interface SelectedSectionContextInterface {
  selectedSection: number;
  setSelectedSection: Dispatch<React.SetStateAction<number>>;
}

const SelectedSectionContext = createContext<SelectedSectionContextInterface>({
  selectedSection: 0,
  setSelectedSection: () => {},
});

export const SelectedSectionContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedSection, setSelectedSection] = useState<number>(0);
  return (
    <SelectedSectionContext.Provider
      value={{
        selectedSection: selectedSection,
        setSelectedSection: setSelectedSection,
      }}
    >
      {children}
    </SelectedSectionContext.Provider>
  );
};

export const useSelectedSectionContext = () => useContext(SelectedSectionContext);
