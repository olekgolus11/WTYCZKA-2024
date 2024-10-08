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
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { paymentType } from "./paymentType";
import { storage } from "@/config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import Toast from "../Toast/Toast";
import AnimateWrapper from "@/animations/AnimateWrapper";
import { PaymentDetailsTextEN, PaymentDetailsTextPL, PaymentRequirementsTextEN, PaymentRequirementsTextPL } from "./paymentDetails";
import FormCheckbox from "../formComponents/FormCheckbox";
import FormSelect from "../formComponents/FormSelect";
import { DegreeOptions, StudentStatusOptions, TransportOptions } from "../RegistrationForm/selectOptions";

const PaymentsForm = () => {
  const MAX_PAYMENTS = 99;
  const { languageMode } = useLanguageModeContext();
  const methods = useForm<paymentType>({ mode: "onBlur" });
  const paymentCollectionRef = collection(db, "payment");
  const [open, setOpen] = useState(false);
  const [isSubmitError, setIsSubmitError] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isFetchError, setIsFetchError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setPaymentState();
  }, []);

  const setPaymentState = async () => {
    try {
      setIsLoading(true);
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
      setIsPaymentOpen(true);
    } catch (e) {
      setIsFetchError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: paymentType) => {
    try {
      setIsUploading(true);
      const storageRef = ref(
        storage,
        `payment/${data.firstName}_${data.lastName}`
      );
      uploadBytes(storageRef, data.file[0]);
      const uploadResult = await uploadBytes(storageRef, data.file[0]);
      const confirmationDocUrl = await getDownloadURL(uploadResult.ref);
      
      const newDocRef = doc(paymentCollectionRef);
      const formData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        pesel: data.pesel,
        timeSend: new Date().toUTCString(),
        timestamp: new Date().getTime(),
        confirmationDoc: confirmationDocUrl,
        emergencyContact: data.emergencyContact,
        diseases: data.diseases,
        transport: data.transport,
        studentStatus: data.studentStatus,
        adultAccept: data.adultAccept,
        paymentAccept: data.paymentAccept
      }
      await setDoc(newDocRef, formData);
    } catch (e) {
      setIsSubmitError(true);
    } finally {
      setIsSubmitError(false);
      setIsUploading(false);
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
          delay={0.3}
          type="FadeInBottom"
          once={true}
        >
          <Typography variant="h5" className="text-center p-10 text-red-600">
            {languageMode == "english"
              ? PaymentRequirementsTextEN.text
              : PaymentRequirementsTextPL.text}
          </Typography>
        </AnimateWrapper>
        <AnimateWrapper
            duration={1}
            delay={0.6}
            type="FadeInBottom"
            once={true}
          >
            <FormCheckbox
              label={
                languageMode == "english" ? `I declare that I am aware that the "Wtyczka" trip is intended only for adults. The age of the participants will be verified during the check-in, and persons under 18 years of age will be deprived of the possibility of participation in both this and future editions of "Wtyczka", without the right to a refund of the costs incurred` :
                `Oświadczam, że jestem świadoma/świadomy, że wyjazd "Wtyczka" jest przeznaczony wyłącznie dla osób pełnoletnich. Wiek uczestników będzie weryfikowany podczas odprawy, a osoby poniżej 18. roku życia zostaną pozbawione możliwości udziału zarówno w tej, jak i w przyszłych edycjach "Wtyczki", bez prawa do zwrotu poniesionych kosztów`
              }
              name="adultAccept"
              shouldSlice={false}
            />
          </AnimateWrapper>
        <AnimateWrapper
            duration={1}
            delay={0.6}
            type="FadeInBottom"
            once={true}
          >
            <FormCheckbox
              label={
                languageMode == "english" ? `I declare that I am aware that in case of resignation from the trip less than 10 days before its start (13.10.2024), the payment will not be refunded.` :
                `Oświadczam, że jestem świadoma/świadomy, że w przypadku rezygnacji z wyjazdu na mniej niż 10 dni przed jego rozpoczęciem (13.10.2024), wpłata nie zostanie zwrócona.`
              }
              name="paymentAccept"
              shouldSlice={false}
            />
        </AnimateWrapper>
        <AnimateWrapper
            duration={1}
            delay={0.6}
            type="FadeInBottom"
            once={true}
          >
          <FormSelect
            label={languageMode == "english" ? "I do have student status" : "Posiadam status studenta"}
            registerName="studentStatus"
            isRequired={true}
            options={StudentStatusOptions.PL}
          />
        </AnimateWrapper>
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
          <FormField
            label={
              languageMode == "english" ? "E-mail address given in registration" : "Adres e-mail podany podczas rejestracji"
            }
            isRequired={true}
            minLength={3}
            maxLength={50}
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
            delay={0.7}
            type="FadeInBottom"
            once={true}
          >
            <FormField
              label={languageMode == 'english' ? 'Contact details in case of emergency (Name, Surname, Phone Number, Who is this person to you (e.g. parent, sibling))' :
                 "Dane osoby do kontaktu w nagłych przypadkach (Imię, Nazwisko, Numer Telefonu, Kim jest dla ciebie ta osoba (np. rodzic, rodzeństwo)"}
              isRequired={true}
              minLength={10}
              maxLength={300}
              registerName="emergencyContact"
            />
          </AnimateWrapper>
          <AnimateWrapper
            duration={1}
            delay={0.6}
            type="FadeInBottom"
            once={true}
          >
          <FormSelect
            label={languageMode == "english" ?  "Do you want to use the transport provided by the organizers?" : "Czy chcesz skorzystać z transportu zapewnionego przez organizatorów?"}
            registerName="transport"
            isRequired={true}
            options={TransportOptions.PL}
          />
        </AnimateWrapper>
        <AnimateWrapper
            duration={1}
            delay={0.7}
            type="FadeInBottom"
            once={true}
          >
            <FormField
              label={languageMode == 'english' ? 'Do you have any diseases, allergies or are you taking any medications permanently? If so, what medications and in what dose do you take?' :
                 "Czy posiadasz jakiekolwiek schorzenia, alergie lub przyjmujesz leki na stałe? Jeśli tak to jakie leki i w jakiej dawce przyjmujesz?"}
              isRequired={true}
              minLength={1}
              maxLength={500}
              registerName="diseases"
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
          <button type="submit" className="button-round button-filled" disabled={isUploading}>
            {!isUploading ? (languageMode == "english"
              ? "Send payment confirmation"
              : "Wyślij potwierdzenie płatności") : (
                <CircularProgress color="primary" />)}
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
