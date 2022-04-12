// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config'
import path from 'path';
import fs from 'fs';

type Data = {
    path: string;
};

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '50mb',
        },
    },
}

const conf = getConfig();
const _path = path.join(conf.serverRuntimeConfig.PROJECT_ROOT, 'public', 'assets');

const decodeBase64Image = (dataString: string) => {
    if (dataString) {
        const matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        if (matches) {
            if (matches?.length < 3) return null;
            return {
                data:matches[2],
                type:matches[1]
            }
        } else return null
    }
}

export default async function handler(
    req: any,
    res: any
) {
    if (req.method === 'POST') {
        const parsedData = JSON.parse(req.body);
        const fileData = decodeBase64Image(parsedData.file);
        if (fileData) {
            console.log(fileData.type);
            fs.writeFileSync(_path, fileData.data, 'base64')
            console.log('done');
            await res.status(200).json({ path: 'John Doe' });
        }else{
            await res.status(400).json({ path: 'John Doe' });
        }
    } else {
        res.status(500).json({ path: '' });
    }
}
