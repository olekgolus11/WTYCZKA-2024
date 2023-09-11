interface navLinkInterface {
  title: string;
  path: string;
}

export const MAIN_PAGE = "/";
const PARTICIPANT_PAGE = "/participant";
const REGULATIONS_PAGE = "/regulations";
const CONTACT_PAGE = "/contact";

export const navLinksPL: navLinkInterface[] = [
  { title: "Strona Główna", path: MAIN_PAGE },
  { title: "Dla uczestników", path: PARTICIPANT_PAGE },
  { title: "Regulamin", path: REGULATIONS_PAGE },
  { title: "Kontakt", path: CONTACT_PAGE },
];
export const navLinksEN: navLinkInterface[] = [
  { title: "Home", path: MAIN_PAGE },
  { title: "For participants", path: PARTICIPANT_PAGE },
  { title: "Regulations", path: REGULATIONS_PAGE },
  { title: "Contact", path: CONTACT_PAGE },
];
