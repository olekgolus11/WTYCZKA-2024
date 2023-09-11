"use client";
import { useEffect, useState } from "react";
import setNavbarHeight from "@/constants/setNavbarHeight";

export default function useScreenWidth() {
  function handleResize() {
    setNavbarHeight();
    setScreenWidth(window.innerWidth);
  }
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setNavbarHeight();
    setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenWidth;
}
