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

const AdditionalQuestionsSection = () => {
  const { languageMode } = useLanguageModeContext();
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
        <FormCheckbox label={StatuteConsentLabel} name="statuteAccept" />
        <FormCheckbox label={PersonalConsentLabel} name="personalDataAccept" />
        <FormCheckbox label={AdditionalConsentLabel} name="additionalAccept" />
      </div>
    </>
  );
};

export default AdditionalQuestionsSection;
