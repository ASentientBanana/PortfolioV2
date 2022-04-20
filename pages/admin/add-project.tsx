import { styled, Container, Input } from '@mui/material';
import { useRef } from 'react';

const sendPost = async (body: string) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const response = await fetch(`${BASE_URL}/api/projects`, {
    method: 'POST',
    body,
  });
  console.log(response.status);
};

const Form = styled('form')({
  width: '80%',
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  padding: '10%',
});

const ProjectInput = styled(Input)({
  borderBottom: 'double 3px black',
});

const PageTitle = styled('h1')({
  textAlign: 'center',
});

const SubmitButton = styled('button')({
  width: '60%',
  margin: 'auto',
  border: 'double black 3px',
  background: 'transparent',
  cursor: 'pointer',
});

const AddProject = () => {
  const formRef = useRef(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (formRef.current) {
      const fd = new FormData(formRef.current);
      const file = fd.get('image-file');
      const f = new FileReader();
      if (file) {
        f.readAsDataURL(file as Blob);
        f.onload = async () => {
          const stack: string[] = (fd.get('stack') as string).split(',');
          sendPost(
            JSON.stringify({
              name: fd.get('name'),
              password: fd.get('password'),
              file: {
                data: f.result,
                // @ts-ignore
                type: file.type,
                // @ts-ignore
                name: file.name,
              },
              stack,
              description: fd.get('description'),
              github: fd.get('github'),
              live: fd.get('live'),
            })
          );
        };
      }
    }
  };

  const DropZone = styled(Container)({
    height: '20vh',
    border: 'dotted #2e3030 3px',
    color: '#2e3030',
    fontWeight: 'bolder',
    fontSize: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'lightgrey',
    userSelect: 'none',
  });

  return (
    <Container>
      <br />
      <Form ref={formRef} onSubmit={handleSubmit}>
        <PageTitle>Add a project.</PageTitle>
        <ProjectInput
          name="name"
          id="project-name"
          placeholder="Project Name: eg. Japanese Parser"
        />
        <br />
        <DropZone
          id="drop_zone"
          onDrop={(e) => {
            console.log(e);
          }}
          onDragOver={(e) => {
            console.log(e);
          }}
        >
          <span>Upload</span>
        </DropZone>
        <br />
        <input name="image-file" id="image-file" multiple={false} type="file" />
        <br />
        <ProjectInput
          name="stack"
          id="project-stack"
          placeholder="eg. JavaScript, React, C# etc."
        />
        <br />
        <ProjectInput
          name="description"
          id="project-description"
          placeholder="Please add a short description"
        />
        <br />
        <ProjectInput
          name="github"
          id="project-github"
          placeholder="Add a github link if possible"
        />
        <br />
        <ProjectInput
          name="live"
          id="project-live"
          placeholder="Add a live project link if possible"
        />
        <br />
        <ProjectInput
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
        <br />
        <SubmitButton type="submit">CLICK</SubmitButton>
      </Form>
    </Container>
  );
};

export default AddProject;
