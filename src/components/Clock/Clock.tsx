"use client";
import { useState } from "react";
import { useLanguageModeContext } from "../../contexts/LanguageModeContext";

const Clock = () => {
  const ONE_MINUTE = 60000;
  const ONE_HOUR = 3600000;
  const ONE_DAY = 86400000;
  const WTYCZKA_EVENT_DATE = "2023-10-26";
  const eventDate = new Date(WTYCZKA_EVENT_DATE);

  const countDaysLeft = () => {
    const currentDate = new Date();
    const counterResult: number = Math.floor(
      (+eventDate.getTime() - +currentDate.getTime() + ONE_HOUR) / ONE_DAY + 1
    );
    return counterResult != 0 ? counterResult : 0;
  };

  const [daysLeft, setDaysLeft] = useState(countDaysLeft());
  const { languageMode } = useLanguageModeContext();

  setInterval(() => {
    setDaysLeft(countDaysLeft());
  }, ONE_MINUTE);

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
          <h3 className="font-medium text-small-label">
            {languageMode == "polish" ? "Wydarzenie" : "The event"}
          </h3>
          <h2 className="mt-[0.2rem] text-bigger-label">
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
