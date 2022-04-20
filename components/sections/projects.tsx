import { Container, styled } from '@mui/material';
import ProjectTile from '../projectTile';
import { IProject } from '../../types';

const ProjectPage = ({ projectList }: { projectList: IProject[] }) => {
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
    [theme.breakpoints.down('xl')]: {
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
