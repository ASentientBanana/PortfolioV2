import { styled, Container } from '@mui/material';
import { IProjects } from '../../types';
import Image from 'next/image';

interface IProps {
  project: IProjects
};

const ProjectTile = ({ project }: IProps) => {

  const MainContainer = styled(Container)({
    border: 'double 3px black',
    minHeight: '270px',
    marginBottom: '20px',
    padding: '0 !important',
  });

  const ImageContainer = styled('div')({
    height: '150px',
    position: 'relative',
    border:'black solid 1px',
    width:'100%',
    backgroundColor:'black',
  });

  const TechContainer = styled('ul')(({ theme })=>({
    display:'grid',
    gridTemplateColumns:'repeat(3,1fr)',
    border:'solid 1px red',
    [theme.breakpoints.down('lg')]: {
      gridTemplateColumns:'repeat(2,1fr)',
    },
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns:'repeat(1,1fr)',
    },
  }));

  return (
    <MainContainer>
      <ImageContainer>
        <Image
          src={'/assets/pengi.jpg'}
           layout='fill'
           objectFit='contain'  
           alt='user image' />
      </ImageContainer>
        <span>Project: {project.name}</span>
        <br/>
        <span>Tech Stack</span>
        <br/>
        <TechContainer>
          {
            project.tech.map((tech,index)=>(<li key={`${tech}-${index}`}>{tech}</li>))
          }
        </TechContainer>
    </MainContainer>
  );

}

export default ProjectTile;
