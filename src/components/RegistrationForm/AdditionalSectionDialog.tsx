"use client";
import { useLanguageModeContext } from "@/contexts/LanguageModeContext";
import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import CloseIcon from "@mui/icons-material/Close";

const AdditionalSectionDialog = ({
  isDialogOpen,
  setIsDialogOpen,
  dialogTextContent,
}: {
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
  dialogTextContent: string;
}) => {
  const { languageMode } = useLanguageModeContext();
  return (
    <Dialog onClose={() => setIsDialogOpen(false)} open={isDialogOpen}>
      <DialogTitle
        sx={{
          color: (theme) => theme.palette.success.main,
          bgcolor: "#050505",
        }}
      >
        {languageMode == "english" ? "Content of consent" : "Treść zgody"}
      </DialogTitle>
      <IconButton
        onClick={() => setIsDialogOpen(false)}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.success.main,
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ bgcolor: "#050505" }}>
        <DialogContentText variant="h6" sx={{ color: "white" }}>
          {dialogTextContent}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default AdditionalSectionDialog;
