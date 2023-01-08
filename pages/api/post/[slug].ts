import type { NextApiRequest, NextApiResponse } from "next";
import { POSTS } from "../../../data/post";


export default function postHandler(req: NextApiRequest, res: NextApiResponse) {
    const { slug } = req.query;

    let toReturn = POSTS.find(p => p.slug === slug) ?? undefined;

    if (toReturn) {
        res.status(200).json(toReturn);
    } else {
        res.status(404).json({ message: "Page not found" });
    }
}