import { useLanguageModeContext } from "@/contexts/LanguageModeContext";
import FormField from "../formComponents/FormField";
import Typography from "@mui/material/Typography";
import FormSelect from "../formComponents/FormSelect";
import { SexOptions } from "./selectOptions";

const ParticipantInfoSection = () => {
  const { languageMode } = useLanguageModeContext();

  return (
    <>
      <Typography variant="h6" className="text-primary-color p-4">
        {languageMode == "english"
          ? "Participant information"
          : "Informacje o uczestniku"}
      </Typography>
      <div className="flex flex-col md:grid md:grid-cols-3">
        <FormField
          label={languageMode == "english" ? "First name" : "Imię"}
          registerName="firstName"
          isRequired={true}
          minLength={2}
          maxLength={15}
        />
        <FormField
          label={languageMode == "english" ? "Last name" : "Nazwisko"}
          registerName="lastName"
          isRequired={true}
          minLength={3}
          maxLength={15}
        />
        <FormField
          label={languageMode == "english" ? "E-mail adress" : "Adres e-mail"}
          registerName="email"
          isRequired={true}
          fieldType="mail"
          minLength={3}
          maxLength={30}
        />
        <FormField
          label={languageMode == "english" ? "Phone number" : "Telefon"}
          registerName="phone"
          isRequired={true}
          fieldType="numeric"
          minLength={9}
          maxLength={9}
        />
        <FormField
          label="PESEL"
          registerName="pesel"
          isRequired={true}
          fieldType="numeric"
          minLength={11}
          maxLength={11}
        />
        <FormSelect
          label={languageMode == "english" ? "Sex" : "Płeć"}
          registerName="sex"
          isRequired={true}
          options={languageMode == "english" ? SexOptions.EN : SexOptions.PL}
        />
        <FormField
          label={languageMode == "english" ? "Postal code" : "Kod pocztowy"}
          registerName="postalCode"
          isRequired={true}
          fieldType="postal-code"
          minLength={6}
          maxLength={6}
        />
        <FormField
          label={languageMode == "english" ? "City" : "Miasto"}
          registerName="city"
          isRequired={true}
          minLength={2}
          maxLength={15}
        />
        <FormField
          label={
            languageMode == "english"
              ? "Street, house number"
              : "Ulica, numer domu"
          }
          registerName="street"
          isRequired={true}
          minLength={3}
          maxLength={20}
        />
      </div>
    </>
  );
};

export default ParticipantInfoSection;
