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
import { Timestamp, addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";
import { paymentType } from "./paymentType";
import { storage } from "@/config/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import Toast from "../Toast/Toast";
import AnimateWrapper from "@/animations/AnimateWrapper";
import { PaymentDetailsTextEN, PaymentDetailsTextPL } from "./paymentDetails";

const PaymentsForm = () => {
  const MAX_PAYMENTS = 105;
  const { languageMode } = useLanguageModeContext();
  const methods = useForm<paymentType>({ mode: "onBlur" });
  const paymentCollectionRef = collection(db, "payment");
  const [open, setOpen] = useState(false);
  const [isSubmitError, setIsSubmitError] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(true);
  const [isFetchError, setIsFetchError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setPaymentState();
  }, []);

  const setPaymentState = async () => {
    try {
      const data = await getDocs(collection(db, "formStates"));
      const forms = data.docs.map((doc) => ({
        ...doc.data(),
      }));
      const counterData = await getDocs(collection(db, "payment"));
      const counter = counterData.docs.map((doc) => ({
        ...doc.data(),
      }));
      const payment = forms.filter((state) => state.form === "payment");
      setIsPaymentOpen(payment[0].isOpen && counter.length < MAX_PAYMENTS);
    } catch (e) {
      setIsFetchError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: paymentType) => {
    try {
      await addDoc(paymentCollectionRef, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        pesel: data.pesel,
        timeSend: Timestamp.now(),
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
  } else if (!isPaymentOpen) {
    return (
      <AnimateWrapper
        duration={1}
        delay={0.1}
        type="FadeInBottom"
        once={true}
        className="flex justify-center items-center h-full text-center text-primary-color px-4 py-6 sm:px-10 xl:px-32"
      >
        <Typography variant="h4">
          {languageMode == "english"
            ? "Currently we are not accepting payments!"
            : "Obecnie nie przyjmujemy wpłat!"}
        </Typography>
      </AnimateWrapper>
    );
  }

  return (
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
          <Typography variant="h5" className="text-center pb-2">
            {languageMode == "english"
              ? PaymentDetailsTextEN.transferRecipient
              : PaymentDetailsTextPL.transferRecipient}
          </Typography>
        </AnimateWrapper>
        <AnimateWrapper
          duration={1}
          delay={0.2}
          type="FadeInBottom"
          once={true}
        >
          <Typography variant="h5" className="text-center pb-2">
            {languageMode == "english"
              ? PaymentDetailsTextEN.accountNumber
              : PaymentDetailsTextPL.accountNumber}
          </Typography>
        </AnimateWrapper>
        <AnimateWrapper
          duration={1}
          delay={0.3}
          type="FadeInBottom"
          once={true}
        >
          <Typography variant="h5" className="text-center pb-2">
            {languageMode == "english"
              ? PaymentDetailsTextEN.title
              : PaymentDetailsTextPL.title}
          </Typography>
        </AnimateWrapper>
        <AnimateWrapper
          duration={1}
          delay={0.4}
          type="FadeInBottom"
          once={true}
        >
          <Typography variant="h5" className="text-center">
            {languageMode == "english"
              ? PaymentDetailsTextEN.amount
              : PaymentDetailsTextPL.amount}
          </Typography>
        </AnimateWrapper>
        <div className="grid grid-cols-1 gap-1 justify-center items-center md:min-w-[30rem] pt-4">
          <AnimateWrapper
            duration={1}
            delay={0.5}
            type="FadeInBottom"
            once={true}
            className="xl:flex-row gap-1 flex flex-col"
          >
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
          </AnimateWrapper>
          <AnimateWrapper
            duration={1}
            delay={0.6}
            type="FadeInBottom"
            once={true}
          >
            <FormField
              label={
                languageMode == "english" ? "E-mail address" : "Adres e-mail"
              }
              isRequired={true}
              minLength={3}
              maxLength={40}
              registerName="email"
              fieldType="mail"
            />
          </AnimateWrapper>
          <AnimateWrapper
            duration={1}
            delay={0.7}
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
            delay={0.8}
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
          delay={0.9}
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
