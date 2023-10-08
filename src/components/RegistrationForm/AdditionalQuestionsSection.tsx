"use client";
import { useLanguageModeContext } from "@/contexts/LanguageModeContext";
import Typography from "@mui/material/Typography";
import FormSelect from "../formComponents/FormSelect";
import FormCheckbox from "../formComponents/FormCheckbox";
import {
  StatuteConsentLabel,
  DietOptions,
  InvoiceOptions,
  ShirtSizeOptions,
  SourceOptions,
  PersonalConsentLabel,
  AdditionalConsentLabel,
} from "./selectOptions";
import FormField from "../formComponents/FormField";
import AdditionalSectionDialog from "./AdditionalSectionDialog";
import { maxCheckboxContentLength } from "@/constants/maxValues";
import { useState } from "react";

const AdditionalQuestionsSection = () => {
  const { languageMode } = useLanguageModeContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTextContent, setDialogTextContent] = useState("");

  const handleDialogContent = (
    e: any,
    textObject: { PL: string; EN: string }
  ) => {
    if (e.target.textContent.length > maxCheckboxContentLength) {
      const text = languageMode == "english" ? textObject.EN : textObject.PL;
      setDialogTextContent(text);
      setIsDialogOpen(true);
    }
  };

  return (
    <>
      <Typography
        variant="h6"
        className="text-primary-color"
        sx={{ margin: "1rem" }}
      >
        {languageMode == "english"
          ? "Additional questions"
          : "Dodatkowe informacje"}
      </Typography>
      <div className="flex flex-col md:grid md:grid-cols-3">
        <FormSelect
          label={languageMode == "english" ? "Diet" : "Dieta"}
          registerName="diet"
          isRequired={true}
          options={languageMode == "english" ? DietOptions.EN : DietOptions.PL}
        />
        <FormSelect
          registerName="shirtSize"
          label={
            languageMode == "english" ? "T-shirt size" : "Rozmiar koszulki"
          }
          isRequired={true}
          options={ShirtSizeOptions.PL}
        />
        <FormField
          label={
            languageMode == "english" ? "Foot size (EU)" : "Rozmiar buta (EU)"
          }
          registerName="footSize"
          isRequired={true}
          minLength={2}
          maxLength={4}
        />
        <FormSelect
          label={
            languageMode == "english"
              ? "How do you know about Wtyczka"
              : "Skąd wiesz o Wtyczce"
          }
          registerName="source"
          isRequired={true}
          options={
            languageMode == "english" ? SourceOptions.EN : SourceOptions.PL
          }
        />
        <FormSelect
          label={languageMode == "english" ? "Invoice" : "Faktura"}
          registerName="invoice"
          isRequired={true}
          options={
            languageMode == "english" ? InvoiceOptions.EN : InvoiceOptions.PL
          }
        />
      </div>
      <div className="flex flex-col m-4">
        <FormCheckbox
          label={
            languageMode == "english"
              ? StatuteConsentLabel.EN
              : StatuteConsentLabel.PL
          }
          name="statuteAccept"
          onClick={(e) => handleDialogContent(e, StatuteConsentLabel)}
        />
        <FormCheckbox
          label={
            languageMode == "english"
              ? PersonalConsentLabel.EN
              : PersonalConsentLabel.PL
          }
          name="personalDataAccept"
          onClick={(e) => handleDialogContent(e, PersonalConsentLabel)}
        />
        <FormCheckbox
          label={
            languageMode == "english"
              ? AdditionalConsentLabel.EN
              : AdditionalConsentLabel.PL
          }
          name="additionalAccept"
          onClick={(e) => handleDialogContent(e, AdditionalConsentLabel)}
        />
      </div>
      <AdditionalSectionDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        dialogTextContent={dialogTextContent}
      />
    </>
  );
};

export default AdditionalQuestionsSection;
