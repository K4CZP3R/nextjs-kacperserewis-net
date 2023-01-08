import type { NextApiRequest, NextApiResponse } from "next";
import { POSTS } from "../../../data/post";


export default function postsHandler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(POSTS);
}