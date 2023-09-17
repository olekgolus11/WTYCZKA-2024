"use client";
import { useLanguageModeContext } from "@/contexts/LanguageModeContext";
import { Typography } from "@mui/material";
import FormField from "../RegistrationForm/FormField";
import { FormProvider, useForm } from "react-hook-form";

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
    <div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="md:px-32 md:py-8 px-4 py-4 flex flex-col gap-1 justify-center items-center"
        >
          <Typography variant="h3" className=" text-center">
            {languageMode == "english"
              ? "Contact form"
              : "Formularz kontaktowy"}
          </Typography>
          <div className="grid grid-cols-1 gap-1 justify-center items-center  md:min-w-[30rem]">
            <FormField
              label={languageMode == "english" ? "Name" : "Imię"}
              isRequired={false}
              minLength={3}
              maxLength={30}
              registerName="name"
            />
            <FormField
              label={
                languageMode == "english" ? "E-mail address" : "Adres e-mail"
              }
              isRequired={false}
              minLength={3}
              maxLength={30}
              registerName="email"
            />
            <FormField
              label={languageMode == "english" ? "Message" : "Wiadomość"}
              isRequired={false}
              minLength={3}
              maxLength={30}
              registerName="message"
              multiline={true}
            />
          </div>
          <div className="flex md:flex-row flex-col gap-4 py-8 justify-center items-center">
            <button type="submit" className="button-round button-outlined">
              {languageMode == "english"
                ? "Contact via facebook"
                : "Skontaktuj się przez facebooka"}
            </button>
            <button type="submit" className="button-round button-filled">
              {languageMode == "english" ? "Send message" : "Wyślij wiadomość"}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ContactForm;
