import type { NextApiRequest, NextApiResponse } from "next";
import { PROJECTS } from "../../../data/projects";


export default function projectHandler(req: NextApiRequest, res: NextApiResponse) {
    const { slug } = req.query;

    let toReturn = PROJECTS.find(p => p.slug === slug) ?? undefined;

    if (toReturn) {
        res.status(200).json(toReturn);
    } else {
        res.status(404).json({ message: "Page not found" });
    }
}