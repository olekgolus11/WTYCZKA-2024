"use client";
import { useLanguageModeContext } from "@/contexts/LanguageModeContext";
import useScreenWidth from "@/hooks/useScreenWidth";
import { Alert, Snackbar } from "@mui/material";
import { SetStateAction } from "react";

const Toast = ({
  setOpen,
  open,
  error,
  slideIndex,
}: {
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  open: boolean;
  error: boolean;
  slideIndex?: number;
}) => {
  const screenWidth = useScreenWidth();
  const { languageMode } = useLanguageModeContext();
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const message = () => {
    if (error) {
      return languageMode == "polish"
        ? "Wystąpił błąd, spróbuj ponownie"
        : "An error occurred, please try again";
    } else {
      return languageMode == "polish"
        ? "Przesłano pomyślnie"
        : "Successfully send";
    }
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      style={{
        transform: `translateX(${
          (slideIndex ? slideIndex : 0) * screenWidth
        }px)`,
      }}
    >
      <Alert
        onClose={handleClose}
        color={error ? "error" : "success"}
        variant="filled"
        sx={{ width: "100%", color: "white" }}
      >
        {message()}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
