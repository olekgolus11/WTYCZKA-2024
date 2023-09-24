"use client";
import Link from "next/link";
import Image from "next/image";
import { Typography } from "@mui/material";
import { useLanguageModeContext } from "@/contexts/LanguageModeContext";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const { languageMode } = useLanguageModeContext();

  return (
    <div className="flex flex-col gap-4 justify-center items-center text-center h-4/5">
      <Typography variant="h3" className=" text-center pb-4 text-primary-color">
        {languageMode == "english"
          ? "Something went wrong"
          : "Coś poszło nie tak"}
      </Typography>
      <Image
        src="/error/error.svg"
        width={600}
        height={600}
        alt="Picture of the error"
      />
      <Link href="/">
        <button className="button-round button-filled">
          {languageMode == "english"
            ? "Go back to home site"
            : "Wróć na stronę główną"}
        </button>
      </Link>
    </div>
  );
}
