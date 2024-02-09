import { IPage } from "../models/page.model";

const NL_PAGES: IPage[] = [
  {
    slug: "index",
    title: "Kacper Serewiś",
    subtitle: "Software Developer",
    extraContent:
      "Afgestudeerd Fontys ICT student, part-time werkzaam als developer bij Stofloos.",
    locale: "nl",
  },
];

const PL_PAGES: IPage[] = [
  {
    slug: "index",
    title: "Kacper Serewiś",
    subtitle: "Software Developer",
    extraContent:
      "Absolwent Fontys ICT, pracujący na jako developer w Stofloos.",
    locale: "pl",
  },
];

const EN_PAGES: IPage[] = [
  {
    slug: "index",
    title: "Kacper Serewiś",
    subtitle: "Junior Software Developer",
    extraContent:
      "Graduated Fontys ICT student, part-time working as a developer at Stofloos.",
    locale: "en",
  },
];

export const PAGES: IPage[] = [...NL_PAGES, ...PL_PAGES, ...EN_PAGES];
