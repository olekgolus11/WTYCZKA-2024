"use client";

import { useEffect, useState } from "react";

export default function useDaysLeft(startDate: string) {
  const ONE_MINUTE = 60000;
  const ONE_HOUR = 3600000;
  const ONE_DAY = 86400000;
  const [daysLeft, setDaysLeft] = useState(1);

  useEffect(() => {
    const currentDate = new Date();
    const eventDate = new Date(startDate);
    const countDaysLeft = () => {
      const counterResult: number = Math.floor(
        (+eventDate.getTime() - +currentDate.getTime() + ONE_HOUR) / ONE_DAY + 1
      );
      return counterResult != 0 ? counterResult : 0;
    };

    setDaysLeft(countDaysLeft());
    setInterval(() => {
      setDaysLeft(countDaysLeft());
    }, ONE_MINUTE);
  }, [startDate]);

  return daysLeft;
}
