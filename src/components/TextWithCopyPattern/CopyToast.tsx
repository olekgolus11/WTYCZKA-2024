"use client";
import { useLanguageModeContext } from "@/contexts/LanguageModeContext";
import useScreenWidth from "@/hooks/useScreenWidth";
import { Snackbar, Alert } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

const CopyToast = ({
  slideIndex,
  isPopupVisible,
  setIsPopupVisible,
}: {
  slideIndex: number;
  isPopupVisible: boolean;
  setIsPopupVisible: Dispatch<SetStateAction<boolean>>;
}) => {
  const { languageMode } = useLanguageModeContext();
  const screenWidth = useScreenWidth();

  return (
    <Snackbar
      open={isPopupVisible}
      style={{
        transform: `translateX(${
          (slideIndex ? slideIndex : 0) * screenWidth
        }px)`,
      }}
    >
      <Alert
        onClose={() => setIsPopupVisible(false)}
        color={"success"}
        variant="filled"
        sx={{ width: "100%", color: "white" }}
      >
        {languageMode === "english" ? "Copied!" : "Skopiowano!"}
      </Alert>
    </Snackbar>
  );
};

export default CopyToast;
