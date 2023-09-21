import { FormProvider, useForm } from "react-hook-form";
import FormField from "./FormField";
import { DevTool } from "@hookform/devtools";
import { useLanguageModeContext } from "@/contexts/LanguageModeContext";
import FormSelect from "./FormSelect";
import {
  AdditionalConsentLabel,
  DegreeOptions,
  DietOptions,
  FacultyOptions,
  InvoiceOptions,
  PersonalConsentLabel,
  SessionOptions,
  SexOptions,
  ShirtSizeOptions,
  SourceOptions,
  StatuteConsentLabel,
} from "./selectOptions";
import { Typography } from "@mui/material";
import FormCheckbox from "./FormCheckbox";
import useDaysLeft from "@/hooks/useDaysLeft";
import { REGISTRATION_DATE } from "@/constants/eventDates";
import AnimateWrapper from "@/animations/AnimateWrapper";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  pesel: string;
  sex: string;
  postalCode: string;
  city: string;
  street: string;
  force: string;
  indexNumber: string;
  degree: string;
  session: string;
  diet: string;
  shirtSize: string;
  footSize: string;
  source: string;
  invoice: string;
  statuteAccept: boolean;
  personalDataAccept: boolean;
  additionalAccept: boolean;
};

const RegistrationForm = () => {
  const methods = useForm<FormValues>({ mode: "onBlur" });
  const { languageMode } = useLanguageModeContext();
  const daysLeft = useDaysLeft(REGISTRATION_DATE);

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <>
      {daysLeft > 0 ? (
        <AnimateWrapper
          className="flex justify-center items-center h-full text-center text-primary-color px-4 py-6 sm:px-10 xl:px-32"
          duration={1}
          delay={0.1}
          type="FadeInBottom"
          once={true}
        >
          <Typography variant="h5">
            {languageMode == "english"
              ? "Registration is not currently available!"
              : "Obecnie nie prowadzimy rejestracji!"}
          </Typography>
        </AnimateWrapper>
      ) : (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <AnimateWrapper
              duration={1}
              delay={0.1}
              type="FadeInBottom"
              once={true}
            >
              <Typography variant="h3" className=" text-center pb-4">
                {languageMode == "english"
                  ? "Sign up for the trip"
                  : "Zapisz się na wyjazd"}
              </Typography>
            </AnimateWrapper>
            <AnimateWrapper
              duration={1}
              delay={0.2}
              type="FadeInBottom"
              once={true}
            >
              <Typography variant="h6" className="text-primary-color p-4">
                {languageMode == "english"
                  ? "Participant information"
                  : "Informacje o uczestniku"}
              </Typography>
            </AnimateWrapper>
            <AnimateWrapper
              duration={1}
              delay={0.3}
              type="FadeInBottom"
              className="flex flex-col md:grid md:grid-cols-3"
              once={true}
            >
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
                label={
                  languageMode == "english" ? "E-mail adress" : "Adres e-mail"
                }
                registerName="email"
                isRequired={true}
                fieldType="mail"
                minLength={3}
                maxLength={20}
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
                options={
                  languageMode == "english" ? SexOptions.EN : SexOptions.PL
                }
              />
              <FormField
                label={
                  languageMode == "english" ? "Postal code" : "Kod pocztowy"
                }
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
            </AnimateWrapper>
            <AnimateWrapper
              duration={1}
              delay={0.4}
              type="FadeInBottom"
              once={true}
            >
              <Typography
                variant="h6"
                className="text-primary-color "
                sx={{ margin: "1rem" }}
              >
                {languageMode == "english"
                  ? "Student details"
                  : "Dane studenta"}
              </Typography>
            </AnimateWrapper>
            <AnimateWrapper
              duration={1}
              delay={0.5}
              type="FadeInBottom"
              className="flex flex-col md:grid md:grid-cols-3"
              once={true}
            >
              <FormSelect
                label={languageMode == "english" ? "Faculty" : "Wydział"}
                registerName="faculty"
                isRequired={true}
                options={
                  languageMode == "english"
                    ? FacultyOptions.EN
                    : FacultyOptions.PL
                }
              />
              <FormField
                label={
                  languageMode == "english" ? "Index number" : "Numer indeksu"
                }
                registerName="indexNumber"
                isRequired={true}
                minLength={6}
                maxLength={6}
              />
              <FormSelect
                label={languageMode == "english" ? "Degree" : "Stopień studiów"}
                registerName="degree"
                isRequired={true}
                options={
                  languageMode == "english"
                    ? DegreeOptions.EN
                    : DegreeOptions.PL
                }
              />
              <FormSelect
                label={languageMode == "english" ? "Session" : "Semestr"}
                registerName="session"
                isRequired={true}
                options={SessionOptions.PL}
              />
            </AnimateWrapper>
            <AnimateWrapper
              duration={1}
              delay={0.6}
              type="FadeInBottom"
              once={true}
            >
              <Typography
                variant="h6"
                className="text-primary-color"
                sx={{ margin: "1rem" }}
              >
                {languageMode == "english"
                  ? "Additional questions"
                  : "Dodatkowe informacje"}
              </Typography>
            </AnimateWrapper>
            <AnimateWrapper
              duration={1}
              delay={0.7}
              type="FadeInBottom"
              once={true}
              className="flex flex-col md:grid md:grid-cols-3"
            >
              <FormSelect
                label={languageMode == "english" ? "Diet" : "Dieta"}
                registerName="diet"
                isRequired={true}
                options={
                  languageMode == "english" ? DietOptions.EN : DietOptions.PL
                }
              />
              <FormSelect
                registerName="shirtSize"
                label={
                  languageMode == "english"
                    ? "T-shirt size"
                    : "Rozmiar koszulki"
                }
                isRequired={true}
                options={ShirtSizeOptions.PL}
              />
              <FormField
                label={languageMode == "english" ? "Shoe size" : "Rozmiar buta"}
                registerName="shoeSize"
                isRequired={true}
                minLength={2}
                maxLength={20}
                fieldType="numeric"
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
                  languageMode == "english"
                    ? SourceOptions.EN
                    : SourceOptions.PL
                }
              />
              <FormSelect
                label={languageMode == "english" ? "Invoice" : "Faktura"}
                registerName="invoice"
                isRequired={true}
                options={
                  languageMode == "english"
                    ? InvoiceOptions.EN
                    : InvoiceOptions.PL
                }
              />
            </AnimateWrapper>
            <AnimateWrapper
              duration={1}
              delay={0.8}
              type="FadeInBottom"
              once={true}
              className="flex flex-col m-4"
            >
              <FormCheckbox label={StatuteConsentLabel} name="statuteAccept" />
              <FormCheckbox
                label={PersonalConsentLabel}
                name="personalDataAccept"
              />
              <FormCheckbox
                label={AdditionalConsentLabel}
                name="additionalAccept"
              />
            </AnimateWrapper>
            <AnimateWrapper
              duration={1}
              delay={0.9}
              type="FadeInBottom"
              once={true}
              className="flex gap-4 items-center justify-center m-8"
            >
              <button type="submit" className="button-round button-filled ">
                Submit
              </button>
            </AnimateWrapper>
          </form>
          {/* <DevTool control={methods.control} /> */}
        </FormProvider>
      )}
    </>
  );
};

export default RegistrationForm;
