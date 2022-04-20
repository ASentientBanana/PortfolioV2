import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import projects from '../../public/_projects.json';
import getConfig from 'next/config';
import { IProject } from '../../types';
import bycriptjs from 'bcryptjs';
import { addProjectHandler } from '../../util';

const secret = process.env.SECRET;

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};

type Data = {
  projects:IProject[]
};

const addProjectToJSON = (project: IProject) => {
  try {
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
  } catch (error) {
    console.error(error);
  }
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
  parsedFile.slice(index, 1);
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      
      res.statusCode = 200;
      break;
    case 'POST':
      const parsedJsonRequest = JSON.parse(req.body);
      if (secret && bycriptjs.compareSync(parsedJsonRequest.password , secret)) {
        const projectData = await addProjectHandler(req, res);
        if (projectData) addProjectToJSON(projectData);
        res.statusCode = 200;
      } else {
        res.statusCode = 400;
      }
      break;
    case 'DELETE':
      if (
        secret &&
        bycriptjs.compareSync(req.body.password, secret) &&
        Number.isInteger(req.body.project)
      ) {
        removeProject(req.body.project);
        res.statusCode = 200;
      } else {
        res.statusCode = 400;
      }
      break;
    default:
      res.statusCode = 200;
      break;
  }
  res.send({
    projects
  });
}
