interface navLinkInterface {
  title: string;
  href: string;
  isInternal: boolean;
}

export const MAIN_PAGE = "/";
export const PARTICIPANT_PAGE = "/participant";
const REGULATIONS_PAGE = "https://google.com";
const CONTACT_PAGE = "/contact";

export const navLinksPL: navLinkInterface[] = [
  { title: "Strona Główna", href: MAIN_PAGE, isInternal: true },
  { title: "Dla uczestników", href: PARTICIPANT_PAGE, isInternal: true },
  { title: "Regulamin", href: REGULATIONS_PAGE, isInternal: false },
  { title: "Kontakt", href: CONTACT_PAGE, isInternal: true },
];
export const navLinksEN: navLinkInterface[] = [
  { title: "Home", href: MAIN_PAGE, isInternal: true },
  { title: "For participants", href: PARTICIPANT_PAGE, isInternal: true },
  { title: "Regulations", href: REGULATIONS_PAGE, isInternal: false },
  { title: "Contact", href: CONTACT_PAGE, isInternal: true },
];
