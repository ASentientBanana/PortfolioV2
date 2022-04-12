import { Container, styled } from '@mui/material';
import ProjectTile from '../projectTile';
import { IProjects } from '../../types';

export const getServerSideProps = async () => {
  const url = process.env.BASE_URL;
  const response = await fetch(`http://${url}/api/projects`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  });
  const res = await response.json();
  return {
    props: {
      projectList: res.data,
    },
  };
};

const ProjectPage = ({ projectList }: { projectList: IProjects[] }) => {
  const MainContainer = styled(Container)({
    width: '100%',
  });

  const ProjectsTitle = styled('h1')(() => ({
    textAlign: 'center',
  }));

  const ContentContainer = styled(Container)(({ theme }) => ({
    display: 'grid',
    gap: '5px',
    gridTemplateColumns: 'repeat(3,1fr)',
    [theme.breakpoints.down('lg')]: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2,1fr)',
    },
    [theme.breakpoints.down('md')]: {
      display: 'grid',
      gridTemplateColumns: 'repeat(1,1fr)',
    },
  }));

  return (
    <MainContainer>
      <ProjectsTitle>Projects</ProjectsTitle>
      <ContentContainer>
        {projectList.map((project, index) => (
          <ProjectTile key={index} project={project} />
        ))}
      </ContentContainer>
    </MainContainer>
  );
};

export default ProjectPage;
