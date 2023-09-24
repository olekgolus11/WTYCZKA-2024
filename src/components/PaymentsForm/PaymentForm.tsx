"use client";
import { useLanguageModeContext } from "@/contexts/LanguageModeContext";
import {
  CircularProgress,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import FormField from "../formComponents/FormField";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import useDaysLeft from "@/hooks/useDaysLeft";
import { PAYMENT_DATE } from "@/constants/eventDates";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";
import { paymentType } from "./paymentType";
import { storage } from "@/config/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import Toast from "../Toast/Toast";

const PaymentsForm = () => {
  const { languageMode } = useLanguageModeContext();
  const methods = useForm<paymentType>({ mode: "onBlur" });
  const paymentCollectionRef = collection(db, "payment");
  const daysLeft = useDaysLeft(PAYMENT_DATE);
  const [open, setOpen] = useState(false);
  const [isSubmitError, setIsSubmitError] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(true);
  const [isFetchError, setIsFetchError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const setPaymentState = async () => {
      try {
        const data = await getDocs(collection(db, "formStates"));
        const forms = data.docs.map((doc) => ({
          ...doc.data(),
        }));
        const payment = forms.filter((state) => state.form === "payment");
        setIsPaymentOpen(payment[0].isOpen);
      } catch (e) {
        setIsFetchError(true);
      } finally {
        setIsLoading(false);
      }
    };

    setPaymentState();
  }, []);

  const onSubmit = async (data: paymentType) => {
    try {
      await addDoc(paymentCollectionRef, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        pesel: data.pesel,
      });
      const storageRef = ref(
        storage,
        `payment/${data.firstName}_${data.lastName}`
      );
      uploadBytes(storageRef, data.file[0]);
    } catch (e) {
      setIsSubmitError(true);
    } finally {
      setIsSubmitError(false);
      setOpen(true);
      methods.reset();
    }
  };

  if (isFetchError) {
    throw new Error("Error while fetching payment state");
  } else if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <CircularProgress color="primary" />
      </div>
    );
  } else if (!isPaymentOpen || daysLeft <= 0) {
    return (
      <div className="flex justify-center items-center h-full text-center text-primary-color px-4 py-6 sm:px-10 xl:px-32">
        <Typography variant="h5">
          {languageMode == "english"
            ? "Currently we are not accepting payments!"
            : "Obecnie nie przyjmujemy wpłat!"}
        </Typography>
      </div>
    );
  }

  return (
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
            ? "Title of the transfer: WTYCZKA2023-FirstNameLastName  Amount: 450 zł"
            : "Tytuł przelewu: WTYCZKA2023-ImieNazwisko  Kwota: 450 zł "}
        </Typography>
        <div className="grid grid-cols-1 gap-1 justify-center items-center  md:min-w-[30rem]">
          <div className="xl:flex-row gap-1 flex flex-col">
            <FormField
              label={languageMode == "english" ? "First name" : "Imię"}
              isRequired={false}
              minLength={3}
              maxLength={30}
              registerName="firstName"
            />
            <FormField
              label={languageMode == "english" ? "Last name" : "Nazwisko"}
              isRequired={false}
              minLength={3}
              maxLength={30}
              registerName="lastName"
            />
          </div>
          <FormField
            label={
              languageMode == "english" ? "E-mail address" : "Adres e-mail"
            }
            isRequired={true}
            minLength={3}
            maxLength={30}
            registerName="email"
            fieldType="mail"
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
      <Toast
        setOpen={setOpen}
        open={open}
        error={isSubmitError}
        slideIndex={1}
      />
    </FormProvider>
  );
};

export default PaymentsForm;
