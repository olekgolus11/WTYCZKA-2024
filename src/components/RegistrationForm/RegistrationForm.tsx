"use client";
import { FormProvider, useForm } from "react-hook-form";
import { useLanguageModeContext } from "@/contexts/LanguageModeContext";
import { CircularProgress, Typography } from "@mui/material";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";
import { registrationType, registrationTypeInitial } from "./registrationType";
import { useEffect, useState } from "react";
import Toast from "../Toast/Toast";
import ParticipantInfoSection from "./ParticipantInfoSection";
import StudentDetailsSection from "./StudentDetailsSection";
import AdditionalQuestionsSection from "./AdditionalQuestionsSection";
import AnimateWrapper from "@/animations/AnimateWrapper";

const RegistrationForm = () => {
  const methods = useForm<registrationType>({
    mode: "onBlur",
    defaultValues: registrationTypeInitial,
  });
  const { languageMode } = useLanguageModeContext();
  const registrationCollectionRef = collection(db, "registration");
  const [open, setOpen] = useState(false);
  const [isSubmitError, setIsSubmitError] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isFetchError, setIsFetchError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const setRegistrationState = async () => {
      try {
        const data = await getDocs(collection(db, "formStates"));
        const forms = data.docs.map((doc) => ({
          ...doc.data(),
        }));
        console.log(forms);
        const registration = forms.filter(
          (state) => state.form === "registration"
        );
        setIsRegistrationOpen(registration[0].isOpen);
        setIsFetchError(false);
      } catch (e) {
        setIsFetchError(true);
      } finally {
        setIsLoading(false);
      }
    };

    setRegistrationState();
  }, []);

  const onSubmit = async (data: registrationType) => {
    try {
      await addDoc(registrationCollectionRef, data);
    } catch (e) {
      setIsSubmitError(true);
    } finally {
      setIsSubmitError(false);
      setOpen(true);
      methods.reset();
    }
  };

  if (isFetchError) {
    throw new Error("Server is offline");
  } else if (isLoading) {
    return (
      <AnimateWrapper
        duration={1}
        delay={0.1}
        type="FadeInBottom"
        once={true}
        className="flex flex-col items-center justify-center h-full"
      >
        <CircularProgress color="primary" />
      </AnimateWrapper>
    );
  } else if (!isRegistrationOpen) {
    return (
      <AnimateWrapper
        duration={1}
        delay={0.1}
        type="FadeInBottom"
        once={true}
        className="flex flex-col justify-center items-center h-full text-center px-4 py-6 sm:px-10 xl:px-32"
      >
        <Typography
          variant="h3"
          className=" text-center pb-4 text-primary-color"
        >
          {languageMode == "english"
            ? "Registration is closed"
            : "Zapisy są zamknięte"}
        </Typography>
        <Typography variant="h6" className="text-primary-color p-4">
          {languageMode == "english"
            ? "Try again later"
            : "Spróbuj ponownie później"}
        </Typography>
      </AnimateWrapper>
    );
  }

  return (
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
          <ParticipantInfoSection />
        </AnimateWrapper>
        <AnimateWrapper
          duration={1}
          delay={0.3}
          type="FadeInBottom"
          once={true}
        >
          <StudentDetailsSection />
        </AnimateWrapper>
        <AnimateWrapper
          duration={1}
          delay={0.4}
          type="FadeInBottom"
          once={true}
        >
          <AdditionalQuestionsSection />
        </AnimateWrapper>
        <AnimateWrapper
          duration={1}
          delay={0.5}
          type="FadeInBottom"
          once={true}
          className="flex gap-4 items-center justify-center m-8"
        >
          <button type="submit" className="button-round button-filled max-sm:px-4">
            {languageMode == "english" ? "Submit" : "Wyślij zgłoszenie"}
          </button>
        </AnimateWrapper>
      </form>
      <Toast setOpen={setOpen} open={open} error={isSubmitError} />
    </FormProvider>
  );
};

export default RegistrationForm;
