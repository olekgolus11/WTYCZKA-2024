"use client";
import { useLanguageModeContext } from "@/contexts/LanguageModeContext";
import { InputAdornment, TextField, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import FormField from "../RegistrationForm/FormField";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { DevTool } from "@hookform/devtools";
import { useState } from "react";

type FormValues = {
  name: string;
  surname: string;
  email: string;
  pesel: string;
  file: FileList;
};

const PaymentsForm = () => {
  const ONE_MINUTE = 60000;
  const ONE_HOUR = 3600000;
  const ONE_DAY = 86400000;
  const WTYCZKA_PAYMENT_DEADLINE = "2023-09-18";
  const eventDate = new Date(WTYCZKA_PAYMENT_DEADLINE);
  const { languageMode } = useLanguageModeContext();
  const methods = useForm<FormValues>({ mode: "onBlur" });

  const countDaysLeft = () => {
    const currentDate = new Date();
    const counterResult: number = Math.floor(
      (+eventDate.getTime() - +currentDate.getTime() + ONE_HOUR) / ONE_DAY + 1
    );
    return counterResult != 0 ? counterResult : 0;
  };

  const [daysLeft, setDaysLeft] = useState(countDaysLeft());

  setInterval(() => {
    setDaysLeft(countDaysLeft());
  }, ONE_MINUTE);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const setPaymentStage = () => {
    if (daysLeft >= 0) {
      return (
        <div>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="flex flex-col gap-1 justify-center items-center"
            >
              <Typography variant="h5" className=" text-center">
                {languageMode == "english"
                  ? "Number of account for payment: xx xxxx xxxx xxxx xxxx"
                  : "Numer konta do płatności: xx xxxx xxxx xxxx xxxx"}
              </Typography>
              <Typography variant="h5" className=" text-center">
                {languageMode == "english"
                  ? "Title of the transfer: WTYCZKA2023-FirstNameLastName  Amount: xxx zł"
                  : "Tytuł przelewu: WTYCZKA2023-ImieNazwisko  Kwota: xxx zł "}
              </Typography>
              <div className="grid grid-cols-1 gap-1 justify-center items-center w-full sm:w-5/6 xl:w-1/2">
                <div className="flex gap-1 w-full max-xl:flex-col">
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
                      label={languageMode == "english" ? "Last Name" : "Nazwisko"}
                      isRequired={true}
                      minLength={3}
                      maxLength={30}
                      registerName="surname"
                    />
                  </div>
                </div>
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
                <FormField
                  label={"PESEL"}
                  isRequired={true}
                  minLength={11}
                  maxLength={11}
                  registerName="pesel"
                />
                <div className="flex flex-col w-auto m-4 gap-1">
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
                </div>
              </div>
              <div className="flex gap-4 py-8 justify-center items-center">
                <button type="submit" className="button-round button-filled">
                  {languageMode == "english"
                    ? "Send payment confirmation"
                    : "Wyślij potwierdzenie płatności"}
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      );
    } else {
      return (
        <div className="flex justify-center items-center h-full text-center">
          <Typography variant="h5" className=" text-center text-primary-color">
            {languageMode == "english"
              ? "Currently we are not accepting payments!"
              : "Obecnie nie przyjmujemy wpłat!"}
          </Typography>
        </div>
      );
    }
  };

  return <div>{setPaymentStage()}</div>;
};

export default PaymentsForm;
