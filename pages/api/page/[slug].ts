import type { NextApiRequest, NextApiResponse } from "next";
import { PAGES } from "../../../data/page";


export default function pageHandler(req: NextApiRequest, res: NextApiResponse) {
    const { slug } = req.query;

    let toReturn = PAGES.find(p => p.slug === slug) ?? undefined;

    if (toReturn) {
        res.status(200).json(toReturn);
    } else {
        res.status(404).json({ message: "Page not found" });
    }
}