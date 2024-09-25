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
  MaturityConsent,
} from "./selectOptions";
import AdditionalSectionDialog from "./AdditionalSectionDialog";
import { maxCheckboxContentLength } from "@/constants/maxValues";
import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import FormField from "../formComponents/FormField";

const AdditionalQuestionsSection = () => {
  const { languageMode } = useLanguageModeContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTextContent, setDialogTextContent] = useState("");
  const { control } = useFormContext();

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

  const invoiceValue = useWatch({
    control,
    name: "invoice",
    defaultValue: "",
  });

  const sourceState = useWatch({
    control,
    name: "source",
    defaultValue: "",
  });

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
        <FormSelect
          label={languageMode == "english" ? "Invoice" : "Faktura"}
          registerName="invoice"
          isRequired={true}
          options={
            languageMode == "english" ? InvoiceOptions.EN : InvoiceOptions.PL
          }
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
        {(sourceState === "Inne" || sourceState === "Other") && (
          <FormField
            label={
              languageMode == "english"
                ? "Please specify source"
                : "Proszę opisać źródło"
            }
            registerName="sourceOther"
            isRequired={true}
            minLength={3}
            maxLength={20}
          />
        )}
      </div>
      {(invoiceValue === "tak" || invoiceValue === "yes") && (
        <>
          <Typography
            variant="h6"
            className="text-primary-color"
            sx={{ margin: "1rem" }}
          >
            {languageMode == "english"
              ? "Invoice information"
              : "Informacje do faktury"}
          </Typography>
          <div className="flex flex-col md:grid md:grid-cols-3">
            <FormField
              label={languageMode == "english" ? "First name" : "Imię"}
              registerName="firstNameInvoice"
              isRequired={true}
              minLength={2}
              maxLength={15}
            />
            <FormField
              label={languageMode == "english" ? "Last name" : "Nazwisko"}
              registerName="lastNameInvoice"
              isRequired={true}
              minLength={3}
              maxLength={15}
            />
            <FormField
              label={languageMode == "english" ? "NIP/PESEL" : "NIP/PESEL"}
              registerName="nipPeselInvoice"
              isRequired={true}
              minLength={3}
              maxLength={15}
            />
          </div>
        </>
      )}
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
        <FormCheckbox
          label={
            languageMode == "english" ? MaturityConsent.EN : MaturityConsent.PL
          }
          name="maturityConsent"
          onClick={(e) => handleDialogContent(e, MaturityConsent)}
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
