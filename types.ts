export interface IProjectLink {
  github?: string;
  live?: string;
}

export interface IProjectIncoming {
  name: string;
  stack: string;
  description: string;
  live: string;
  github: string;
  file?: IFileIncoming;
  password?: string
}
export interface IProject {
  name: string;
  stack: string;
  description: string;
  live: string;
  github: string;
  image?: string;
}

export interface IFileIncoming {
  data: string | ArrayBuffer | null;
  type: string;
  name?: string;
}
