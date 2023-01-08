import type { NextApiRequest, NextApiResponse } from "next";
import { PAGES } from "../../../data/page";


export default function postsHandler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(PAGES);
}