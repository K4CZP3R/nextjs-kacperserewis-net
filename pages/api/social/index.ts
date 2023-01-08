import type { NextApiRequest, NextApiResponse } from "next";
import { SOCIALS } from "../../../data/socials";


export default function socialHandler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(SOCIALS);
}