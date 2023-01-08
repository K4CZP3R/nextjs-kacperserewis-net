import { readFileSync } from "fs";
import { IPost } from "../models/post.model";

const reverseEngineeringTpLinkTapoContent = readFileSync("./data/reverse-engineering-tp-link-tapo-content.md").toString();

export const POSTS: IPost[] = [
    {
        title: "Reverse Engineering TP-Link TAPO",
        description: "I've reverse engineered smart plug, TP-Link Tapo. This is my writeup describing my work.",
        content: reverseEngineeringTpLinkTapoContent,
        tags: ["#Python",  "#Smart Home", "#IoT", "#TP-Link", "#Tapo","#Java"],
        images: null,
        slug: "reverse-engineering-tp-link-tapo",
        createdAt: "2020-10-16T00:00:00.000Z",
        updatedAt: "2023-01-08T14:49:31.232Z",

    }
]