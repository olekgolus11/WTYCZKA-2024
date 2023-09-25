export type registrationType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  pesel: string;
  sex: string;
  postalCode: string;
  city: string;
  street: string;
  faculty: string;
  indexNumber: string;
  degree: string;
  session: string;
  diet: string;
  shirtSize: string;
  footSize: string;
  source: string;
  invoice: string;
  statuteAccept: boolean;
  personalDataAccept: boolean;
  additionalAccept: boolean;
};

export const registrationTypeInitial: registrationType = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  pesel: "",
  sex: "",
  postalCode: "",
  city: "",
  street: "",
  faculty: "",
  indexNumber: "",
  degree: "",
  session: "",
  diet: "",
  shirtSize: "",
  footSize: "",
  source: "",
  invoice: "",
  statuteAccept: false,
  personalDataAccept: false,
  additionalAccept: false,
};
