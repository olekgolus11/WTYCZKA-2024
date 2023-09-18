"use client";
import { useLanguageModeContext } from "@/contexts/LanguageModeContext";
import { Typography } from "@mui/material";
import FormField from "../RegistrationForm/FormField";
import { FormProvider, useForm } from "react-hook-form";
import { facebookLink } from "@/services/socialLinks";

type FormValues = {
  name: string;
  email: string;
  message: string;
};

const ContactForm = () => {
  const { languageMode } = useLanguageModeContext();
  const methods = useForm<FormValues>({ mode: "onBlur" });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <main className="overflow-y-auto">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="px-4 py-6 sm:px-10 xl:px-32 flex flex-col gap-1 justify-center items-center"
        >
          <Typography variant="h3" className=" text-center">
            {languageMode == "english"
              ? "Contact form"
              : "Formularz kontaktowy"}
          </Typography>
          <div className="grid grid-cols-1 gap-1 justify-center items-center w-full sm:w-5/6 xl:w-1/2">
            <FormField
              label={languageMode == "english" ? "First name" : "Imię"}
              isRequired={false}
              minLength={3}
              maxLength={30}
              registerName="name"
            />
            <FormField
              label={
                languageMode == "english" ? "E-mail address" : "Adres e-mail"
              }
              isRequired={true}
              minLength={3}
              maxLength={30}
              registerName="email"
            />
            <FormField
              label={languageMode == "english" ? "Message" : "Wiadomość"}
              isRequired={true}
              minLength={3}
              maxLength={80}
              registerName="message"
              multiline={true}
            />
          </div>
          <div className="flex flex-wrap gap-4 py-8 justify-center items-center">
            <a href={facebookLink} target="_blank">
              <div className="button-round button-outlined">
                {languageMode == "english"
                  ? "Contact via facebook"
                  : "Skontaktuj się przez facebooka"}
              </div>
            </a>
            <button type="submit" className="button-round button-filled">
              {languageMode == "english" ? "Send message" : "Wyślij wiadomość"}
            </button>
          </div>
        </form>
      </FormProvider>
    </main>
  );
};

export default ContactForm;
