"use client";
import { useLanguageModeContext } from "../../contexts/LanguageModeContext";
import useDaysLeft from "@/hooks/useDaysLeft";
import { EVENT_DATE } from "@/constants/eventDates";

const Clock = () => {
  const daysLeft = useDaysLeft(EVENT_DATE);
  const { languageMode } = useLanguageModeContext();

  const setCounterInfo = () => {
    if (daysLeft > 0) {
      return (
        <>
          <p className="date-label">
            {languageMode == "polish"
              ? "26 PAŹDZIERNIKA 2023"
              : "26 OCTOBER 2023"}
          </p>
          <h1 className="date-counter">{daysLeft}</h1>
          <p className="counter-label">
            {daysLeft == 1
              ? languageMode == "polish"
                ? "DZIEŃ DO WYDARZENIA"
                : "DAY TO EVENT"
              : languageMode == "polish"
              ? "DNI DO WYDARZENIA"
              : "DAYS TO EVENT"}
          </p>
        </>
      );
    } else if (daysLeft === 0) {
      return (
        <>
          <h3 className="font-semibold text-small-label">
            {languageMode == "polish" ? "Wydarzenie" : "The event"}
          </h3>
          <h2 className="mt-[0.2rem] text-bigger-label font-bold">
            {languageMode == "polish" ? "Trwa" : "Has begun"}
          </h2>
        </>
      );
    } else {
      return (
        <>
          <p className="date-label">
            {languageMode == "polish"
              ? "Wydarzenie odbyło się"
              : "The event was"}
          </p>
          <h1 className="date-counter">{-daysLeft}</h1>
          <p className="counter-label">
            {daysLeft == -1
              ? languageMode == "polish"
                ? "DZIEŃ TEMU"
                : "DAY AGO"
              : languageMode == "polish"
              ? "DNI TEMU"
              : "DAYS AGO"}
          </p>
        </>
      );
    }
  };

  return (
    <div className="inline-flex items-center justify-center flex-col font-bold text-center gap-1">
      {setCounterInfo()}
    </div>
  );
};

export default Clock;
