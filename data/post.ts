import { readFileSync } from "fs";
import { IPost } from "../models/post.model";

const reverseEngineeringTpLinkTapoContent = readFileSync(
  "./data/reverse-engineering-tp-link-tapo-content.md"
).toString();

const reverseEngineeringTpLinkTapoContentNl = readFileSync(
  "./data/reverse-engineering-tp-link-tapo-content-nl.md"
).toString();

const reverseEngineeringTpLinkTapoContentPl = readFileSync(
  "./data/reverse-engineering-tp-link-tapo-content-pl.md"
).toString();

const NL_POSTS: IPost[] = [
  {
    title: "Reverse Engineering TP-Link TAPO",
    description:
      "Ik heb een smart plug, TP-Link Tapo, gereverse-engineerd. Dit is mijn writeup waarin ik mijn werk beschrijf.",
    content: reverseEngineeringTpLinkTapoContentNl,
    tags: ["#Python", "#Smart Home", "#IoT", "#TP-Link", "#Tapo", "#Java"],
    images: null,
    slug: "reverse-engineering-tp-link-tapo",
    createdAt: "2020-10-16T00:00:00.000Z",
    updatedAt: "2023-01-08T14:49:31.232Z",
    locale: "nl",
  },
];
const PL_POSTS: IPost[] = [
  {
    title: "Reverse Engineering TP-Link TAPO",
    description:
      "Zreversowałem smart plug, TP-Link Tapo. Oto moje opracowanie opisujące moją pracę.",
    content: reverseEngineeringTpLinkTapoContentPl,
    tags: ["#Python", "#Smart Home", "#IoT", "#TP-Link", "#Tapo", "#Java"],
    images: null,
    slug: "reverse-engineering-tp-link-tapo",
    createdAt: "2020-10-16T00:00:00.000Z",
    updatedAt: "2023-01-08T14:49:31.232Z",
    locale: "pl",
  },
];

const EN_POSTS: IPost[] = [
  {
    title: "Reverse Engineering TP-Link TAPO",
    description:
      "I've reverse engineered smart plug, TP-Link Tapo. This is my writeup describing my work.",
    content: reverseEngineeringTpLinkTapoContent,
    tags: ["#Python", "#Smart Home", "#IoT", "#TP-Link", "#Tapo", "#Java"],
    images: null,
    slug: "reverse-engineering-tp-link-tapo",
    createdAt: "2020-10-16T00:00:00.000Z",
    updatedAt: "2023-01-08T14:49:31.232Z",
    locale: "en",
  },
];

export const POSTS: IPost[] = [...EN_POSTS, ...NL_POSTS, ...PL_POSTS];
