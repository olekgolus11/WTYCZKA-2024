"use client";
import { useLanguageModeContext } from "@/contexts/LanguageModeContext";
import { Typography } from "@mui/material";
import FormField from "../RegistrationForm/FormField";
import { FormProvider, useForm } from "react-hook-form";
import { facebookLink } from "@/services/socialLinks";
import AnimateWrapper from "@/animations/AnimateWrapper";

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
          <AnimateWrapper
            duration={1}
            delay={0.1}
            type="FadeInBottom"
            once={true}
          >
            <Typography variant="h3" className=" text-center">
              {languageMode == "english"
                ? "Contact form"
                : "Formularz kontaktowy"}
            </Typography>
          </AnimateWrapper>
          <div className="grid grid-cols-1 gap-1 justify-center items-center w-full sm:w-5/6 xl:w-1/2">
            <AnimateWrapper
              duration={1}
              delay={0.2}
              type="FadeInBottom"
              once={true}
            >
              <FormField
                label={languageMode == "english" ? "First name" : "Imię"}
                isRequired={false}
                minLength={3}
                maxLength={30}
                registerName="name"
              />
            </AnimateWrapper>
            <AnimateWrapper
              duration={1}
              delay={0.3}
              type="FadeInBottom"
              once={true}
            >
              <FormField
                label={
                  languageMode == "english" ? "E-mail address" : "Adres e-mail"
                }
                isRequired={true}
                minLength={3}
                maxLength={30}
                registerName="email"
              />
            </AnimateWrapper>
            <AnimateWrapper
              duration={1}
              delay={0.4}
              type="FadeInBottom"
              once={true}
            >
              <FormField
                label={languageMode == "english" ? "Message" : "Wiadomość"}
                isRequired={true}
                minLength={3}
                maxLength={80}
                registerName="message"
                multiline={true}
              />
            </AnimateWrapper>
          </div>
          <div className="flex flex-wrap gap-4 py-8 justify-center items-center">
            <AnimateWrapper
              duration={1}
              delay={0.5}
              type="FadeInBottom"
              once={true}
            >
              <a
                href={facebookLink}
                target="_blank"
                className="button-round button-outlined block"
              >
                {languageMode == "english"
                  ? "Contact via facebook"
                  : "Skontaktuj się przez facebooka"}
              </a>
            </AnimateWrapper>
            <AnimateWrapper
              duration={1}
              delay={0.6}
              type="FadeInBottom"
              once={true}
            >
              <button type="submit" className="button-round button-filled">
                {languageMode == "english"
                  ? "Send message"
                  : "Wyślij wiadomość"}
              </button>
            </AnimateWrapper>
          </div>
        </form>
      </FormProvider>
    </main>
  );
};

export default ContactForm;
