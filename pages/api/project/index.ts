import type { NextApiRequest, NextApiResponse } from "next";
import { PROJECTS } from "../../../data/projects";


export default function projectsHandler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(PROJECTS);
}