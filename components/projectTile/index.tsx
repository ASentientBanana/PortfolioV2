import { styled, Container } from '@mui/material';
import { IProject } from '../../types';
import Image from 'next/image';
import Link from 'next/link';

interface IProps {
  project: IProject;
  baseURl: string;
}

const ProjectTile = ({ project, baseURl }: IProps) => {


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
  })

  const LinkContainer = styled(Container)({
    minHeight: '30px',
    display: 'flex',
    width: '100%',
    justifyContent: 'space-evenly'
  });

  const TextContainer = styled(Container)({

  })

  const CustomImage = styled(Image)({
    cursor: 'pointer'
  })

  const Separator = styled('hr')(({ theme }) => ({
    border: `1px solid ${theme.palette.primary.main}`
  }))

  return (
    <MainContainer>
      <ImageContainer>
        {
          (project.live !== 'Null' || project.github !== 'Null') ?
            <a target='_blank' rel="noreferrer" href={project.live !== 'Null' ? project.live : project.github}>
              <CustomImage
                src={project.image ? `${baseURl}/${project.image}` : '/assets/default.jpg'}
                layout="fill"
                objectFit="contain"
                alt="user image"
              />
            </a>
            :
            <Image
              src={project.image ? `${baseURl}/${project.image}` : '/assets/default.jpg'}
              layout="fill"
              objectFit="contain"
              alt="user image"
            />
        }
      </ImageContainer>
      <br />
      <TextContainer>
        <SectionTitle>Project: </SectionTitle>
        <br />
        <SectionTitle>{project.name} </SectionTitle>
      </TextContainer>

      <br />
      <Separator />
      <TextContainer>
        <SectionTitle>Tech Stack</SectionTitle>
      </TextContainer>
      <TechContainer>
        {project.stack &&
          project.stack.split(',').map(
            (tech, index) =>
              tech && <ListItem key={`${tech}-${index}`}>{tech}</ListItem>
          )}
      </TechContainer>
      <Separator />
      <LinkContainer>
        {(project.github && project.github !== 'Null') && <Link href={project.github}>GitHub</Link>}
        {(project.live && project.live !== 'Null') && <Link href={project.live}>Live Project</Link>}
      </LinkContainer>
      <Separator />
      <DescriptionContainer>
        {project.description}
      </DescriptionContainer>
    </MainContainer>
  );
};

export default ProjectTile;
