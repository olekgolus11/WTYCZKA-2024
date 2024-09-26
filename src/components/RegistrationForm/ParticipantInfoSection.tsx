"use client";
import { useLanguageModeContext } from "@/contexts/LanguageModeContext";
import FormField from "../formComponents/FormField";
import Typography from "@mui/material/Typography";
import FormSelect from "../formComponents/FormSelect";
import { SexOptions } from "./selectOptions";

const ParticipantInfoSection = () => {
  const { languageMode } = useLanguageModeContext();
  return (
    <>
      <Typography variant="h6" className=" p-4">
        {languageMode == "english"
          ? `If a minor provides false information, they will be disqualified from participating in this and future editions of the "Wtyczka" and will not be refunded.`
          : `Jeśli osoba niepełnoletnia poda nieprawdziwe informacje, zostanie ona pozbawiona możliwości uczestniczenia w tej, jak i w kolejnych edycjach "Wtyczki" oraz nie dostanie zwrotu kosztów` }
      </Typography>
      <Typography variant="h6" className=" p-4">
        {languageMode == "english"
          ? `Data on student status will be verified and if found to be incorrect, it will result in disqualification from participation in this and future editions of the "Wtyczka".`
          : `Dane o posiadaniu statusu studenta będą weryfikowane i jeśli okażą się niepoprawne, będzie się to wiązało z wykluczeniem z udziału w tej oraz kolejnych edycjach "Wtyczki".`}
      </Typography>
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
          label={languageMode == "english" ? "Date of birth" : "Data urodzenia"}
          registerName="birthDate"
          isRequired={true}
          fieldType="date"
          minLength={10}
          maxLength={10}
        />
        <FormField
          label={languageMode == "english" ? "E-mail adress" : "Adres e-mail"}
          registerName="email"
          isRequired={true}
          fieldType="mail"
          minLength={3}
          maxLength={40}
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
      </div>
    </>
  );
};

export default ParticipantInfoSection;
