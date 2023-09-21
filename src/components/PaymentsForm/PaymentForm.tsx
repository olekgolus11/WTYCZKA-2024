"use client";
import { useLanguageModeContext } from "@/contexts/LanguageModeContext";
import { InputAdornment, TextField, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import FormField from "../RegistrationForm/FormField";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { DevTool } from "@hookform/devtools";
import useDaysLeft from "@/hooks/useDaysLeft";
import { PAYMENT_DATE } from "@/constants/eventDates";
import AnimateWrapper from "@/animations/AnimateWrapper";

type FormValues = {
  name: string;
  surname: string;
  email: string;
  pesel: string;
  file: FileList;
};

const PaymentsForm = () => {
  const { languageMode } = useLanguageModeContext();
  const methods = useForm<FormValues>({ mode: "onBlur" });
  const daysLeft = useDaysLeft(PAYMENT_DATE);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const setPaymentStage = () => {
    if (daysLeft <= 0) {
      return (
        <div>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="flex flex-col gap-1 justify-center items-center"
            >
              <AnimateWrapper
                duration={1}
                delay={0.1}
                type="FadeInBottom"
                once={true}
              >
                <Typography variant="h5" className=" text-center">
                  {languageMode == "english"
                    ? "Number of account for payment: xx xxxx xxxx xxxx xxxx"
                    : "Numer konta do płatności: xx xxxx xxxx xxxx xxxx"}
                </Typography>
              </AnimateWrapper>
              <AnimateWrapper
                duration={1}
                delay={0.2}
                type="FadeInBottom"
                once={true}
              >
                <Typography variant="h5" className=" text-center">
                  {languageMode == "english"
                    ? "Title of the transfer: WTYCZKA2023-FirstNameLastName  Amount: xxx zł"
                    : "Tytuł przelewu: WTYCZKA2023-ImieNazwisko  Kwota: xxx zł "}
                </Typography>
              </AnimateWrapper>
              <div className="grid grid-cols-1 gap-1 justify-center items-center w-full sm:w-5/6 xl:w-1/2">
                <AnimateWrapper
                  duration={1}
                  delay={0.3}
                  type="FadeInBottom"
                  once={true}
                  className="flex gap-1 w-full max-xl:flex-col"
                >
                  <div className="w-full">
                    <FormField
                      label={languageMode == "english" ? "First name" : "Imię"}
                      isRequired={true}
                      minLength={3}
                      maxLength={30}
                      registerName="name"
                    />
                  </div>
                  <div className="w-full">
                    <FormField
                      label={
                        languageMode == "english" ? "Last Name" : "Nazwisko"
                      }
                      isRequired={true}
                      minLength={3}
                      maxLength={30}
                      registerName="surname"
                    />
                  </div>
                </AnimateWrapper>
                <AnimateWrapper
                  duration={1}
                  delay={0.4}
                  type="FadeInBottom"
                  once={true}
                >
                  <FormField
                    label={
                      languageMode == "english"
                        ? "E-mail address"
                        : "Adres e-mail"
                    }
                    isRequired={true}
                    minLength={3}
                    maxLength={30}
                    registerName="email"
                  />
                </AnimateWrapper>
                <AnimateWrapper
                  duration={1}
                  delay={0.5}
                  type="FadeInBottom"
                  once={true}
                >
                  <FormField
                    label={"PESEL"}
                    isRequired={true}
                    minLength={11}
                    maxLength={11}
                    registerName="pesel"
                  />
                </AnimateWrapper>
                <AnimateWrapper
                  duration={1}
                  delay={0.6}
                  type="FadeInBottom"
                  once={true}
                  className="flex flex-col w-auto m-4 gap-1"
                >
                  <Typography variant="subtitle1">
                    {languageMode == "english"
                      ? "Confirmation of the payment"
                      : "Potwierdzenie wykonania przelewu"}
                  </Typography>
                  <TextField
                    type="file"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <UploadFileIcon sx={{ color: "white" }} />
                        </InputAdornment>
                      ),
                    }}
                    {...methods.register("file")}
                  />
                </AnimateWrapper>
              </div>
              <AnimateWrapper
                duration={1}
                delay={0.7}
                type="FadeInBottom"
                once={true}
                className="flex gap-4 py-8 justify-center items-center"
              >
                <button type="submit" className="button-round button-filled">
                  {languageMode == "english"
                    ? "Send payment confirmation"
                    : "Wyślij potwierdzenie płatności"}
                </button>
              </AnimateWrapper>
            </form>
          </FormProvider>
        </div>
      );
    } else {
      return (
        <AnimateWrapper
          duration={1}
          delay={0.1}
          type="FadeInBottom"
          once={true}
          className="flex justify-center items-center h-full text-center text-primary-color px-4 py-6 sm:px-10 xl:px-32"
        >
          <Typography variant="h5">
            {languageMode == "english"
              ? "Currently we are not accepting payments!"
              : "Obecnie nie przyjmujemy wpłat!"}
          </Typography>
        </AnimateWrapper>
      );
    }
  };

  return <>{setPaymentStage()}</>;
};

export default PaymentsForm;
