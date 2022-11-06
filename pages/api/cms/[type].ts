// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  cmsType: string,
    cmsData: any
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    // Get the type of the CMS
    const type = req.query.type?.toString() || 'none';

    let cmsData: any = {};

    switch(type) {
        case "index":
            cmsData = {
                title: "Hello World",
                description: "This is a description"
            };
        break;
        default:
            cmsData = undefined;
            break;
    }


    res.status(200).json({cmsType: type, cmsData})
}
