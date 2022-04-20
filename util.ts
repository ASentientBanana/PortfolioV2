import type { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';
import path from 'path';
import fs from 'fs';
import { IProjectIncoming } from './types';

type Data = {};

const conf = getConfig();
const _path = path.join(
  conf.serverRuntimeConfig.PROJECT_ROOT,
  'public',
  'assets'
);
const BASE_URL = process.env.BASE_URL;

export const decodeBase64Image = (dataString: string) => {
  if (dataString) {
    const matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (matches) {
      if (matches?.length < 3) return null;
      return {
        data: matches[2],
        type: matches[1],
      };
    } else return null;
  }
};

export const addProjectHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const parsedData: IProjectIncoming = JSON.parse(req.body);
  if (parsedData.file && parsedData.file.data && parsedData.file.name) {
    const imageData = decodeBase64Image(parsedData.file.data as string);
    if (imageData) {
      try {
        fs.writeFileSync(
          path.join(_path, parsedData.file.name),
          imageData.data,
          'base64'
        );
        const imagePath = `/assets/${parsedData.file.name}`;
        delete parsedData.file;
        if(parsedData.password) delete parsedData.password
        return {
          ...parsedData,
          filePath: imagePath,
          stack: parsedData.stack,
        };
      } catch (error) {
        res.statusCode = 500;
      }
      res.statusCode = 200;
    } else {
      res.statusCode = 400;
    }
    return null;
  }
};
