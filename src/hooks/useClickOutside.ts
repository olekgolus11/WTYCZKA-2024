"use client";
import { useRef, ElementRef, useEffect } from "react";

export default function useClickOutside(handleFunction: () => void) {
  const areaToCheckRef = useRef<ElementRef<"div">>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        areaToCheckRef.current &&
        !areaToCheckRef.current.contains(event.target as Node)
      ) {
        handleFunction();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleFunction]);

  return areaToCheckRef;
}
