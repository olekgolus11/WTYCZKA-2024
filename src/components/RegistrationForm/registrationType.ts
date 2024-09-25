export type registrationType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  pesel: string;
  sex: string;
  faculty: string;
  indexNumber: string;
  degree: string;
  collegeLevel: string;
  fieldOfStudy: string;
  diet: string;
  shirtSize: string;
  source: string;
  invoice: string;
  statuteAccept: boolean;
  personalDataAccept: boolean;
  additionalAccept: boolean;
  firstNameInvoice: string;
  lastNameInvoice: string;
  nipPeselInvoice: string;
};

export const registrationTypeInitial: registrationType = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  pesel: "",
  sex: "",
  faculty: "",
  indexNumber: "",
  degree: "",
  collegeLevel: "",
  fieldOfStudy: "",
  diet: "",
  shirtSize: "",
  source: "",
  invoice: "",
  statuteAccept: false,
  personalDataAccept: false,
  additionalAccept: false,
  firstNameInvoice: "",
  lastNameInvoice: "",
  nipPeselInvoice: "",
};
