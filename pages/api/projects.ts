// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import projects from '../../public/_projects.json';
import getConfig from 'next/config';
import { IProjects } from '../../types';
import bycriptjs from 'bcryptjs';

const secret = process.env.SECRET;

type Data = {
  data: any[];
};

const addProject = (project: IProjects) => {
  const conf = getConfig();
  const _path = path.join(
    conf.serverRuntimeConfig.PROJECT_ROOT,
    'public',
    '_projects.json'
  );
  const fileData = fs.readFileSync(_path, 'utf-8');
  const parsedFile = JSON.parse(fileData);
  parsedFile.push(project);
  fs.writeFileSync(_path, JSON.stringify(parsedFile, null, 4));
};

const removeProject = (index: number) => {
  const conf = getConfig();
  const _path = path.join(
    conf.serverRuntimeConfig.PROJECT_ROOT,
    'public',
    '_projects.json'
  );
  const fileData = fs.readFileSync(_path, 'utf-8');
  const parsedFile: any[] = JSON.parse(fileData);
  const _ = parsedFile.slice(index, 1);
  fs.writeFileSync(_path, JSON.stringify(parsedFile, null, 4));
};

const getProjects = () => {
  const conf = getConfig();
  const _path = path.join(
    conf.serverRuntimeConfig.PROJECT_ROOT,
    'public',
    '_projects.json'
  );
  const fileData = fs.readFileSync(_path, 'utf-8');
  return fileData;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      res.status(200).send({ data: projects });
      break;
    case 'POST':
      if (secret && bycriptjs.compareSync(req.body.password, secret)) {
        // addProject(req.body.project)
        res.status(200).send({ data: projects });
      } else {
        res.status(400).send({ data: [] });
      }
      break;
    case 'DELETE':
      if (
        secret &&
        bycriptjs.compareSync(req.body.password, secret) &&
        Number.isInteger(req.body.project)
      ) {
        removeProject(req.body.project);
        res.status(200).send({ data: projects });
      } else {
        res.status(400).send({ data: [] });
      }
      break;
    default:
      res.status(200).send({ data: projects });
      break;
  }
}
