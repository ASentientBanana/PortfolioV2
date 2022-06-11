import { styled, Container } from '@mui/material';
import { IProject } from '../../types';
import Image from 'next/image';
import Link from 'next/link';

interface IProps {
  project: IProject;
  baseURl: string;
}

const ProjectTile = ({ project, baseURl }: IProps) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const MainContainer = styled(Container)(({ theme }) => ({
    border: `double 3px ${theme.palette.primary.main}`,
    minHeight: '270px',
    marginBottom: '20px',
    padding: '0 !important',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: 'repeat(1,1fr)',
      width: '65%',
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'repeat(1,1fr)',
      width: '90%',
    },
  }));

  const ImageContainer = styled('div')({
    height: '150px',
    position: 'relative',
    border: 'black solid 1px',
    width: '100%',
    backgroundColor: 'black',
  });

  const TechContainer = styled('ul')(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(3,1fr)',
    [theme.breakpoints.down('lg')]: {
      gridTemplateColumns: 'repeat(2,1fr)',
    },
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: 'repeat(1,1fr)',
    },
  }));

  const ListItem = styled('li')({
    listStyle: 'none',
    position: 'relative',
    paddingLeft: '13px',
    textAlign: 'left',
    ':before': {
      content: '"◈"',
      fontSize: '10px',
      position: 'absolute',
      top: '1px',
      left: '1px',
    },
  });

  const DescriptionContainer = styled('p')(() => ({
    padding: '0 10px'
  }));

  const SectionTitle = styled('span')({
    padding: '0 10px'
  })

  const LinkContainer = styled(Container)({
    minHeight: '30px',
    display: 'flex',
    width: '100%',
    justifyContent: 'space-evenly'
  });

  const Separator = styled('hr')(({ theme }) => ({
    border: `1px solid ${theme.palette.primary.main}`
  }))
  console.log(`${baseURl}/${project.image}`);

  return (
    <MainContainer>
      <ImageContainer>
        <Image
          src={project.image ? `${baseURl}/${project.image}` : '/assets/default.jpg'}
          layout="fill"
          objectFit="contain"
          alt="user image"
        />
      </ImageContainer>
      <br />
      <SectionTitle>Project: </SectionTitle>
      {project.name}
      <br />
      <Separator />
      <SectionTitle>Tech Stack</SectionTitle>
      <br />
      <TechContainer>
        {project.stack &&
          project.stack.split(',').map(
            (tech, index) =>
              tech && <ListItem key={`${tech}-${index}`}>{tech}</ListItem>
          )}
      </TechContainer>
      <Separator />
      <LinkContainer>
        {project.github && <Link href={project.github}>GitHub</Link>}
        {project.live && <Link href={project.live}>Live Project</Link>}
      </LinkContainer>
      <Separator />
      <DescriptionContainer>
        {project.description}
      </DescriptionContainer>
    </MainContainer>
  );
};

export default ProjectTile;
