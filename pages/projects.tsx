import { Container, styled } from '@mui/material';
import ProjectTile from '../components/projectTile';
import { IProject } from '../types';

export async function getServerSideProps() {
    try {
        const baseUrl = process.env.BASE_URL;
        const response = await fetch(`${baseUrl}/portfolio/get-projects`);
        const projectData = await response.json();
        return {
            props: {
                baseUrl,
                projects: projectData.projects,
            },
        };
    } catch (error) {
        console.error(error);
        return {
            props: {
                baseURL: '',
                projects: [],
            },
        };
    }
}

const ProjectPage = ({ projects, baseUrl }: { projects: IProject[], baseUrl: string }) => {
    const MainContainer = styled(Container)({
        width: '100%',
        overflowY: 'scroll',
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
                {projects.map((project, index) => (
                    <ProjectTile key={index} baseURl={baseUrl} project={project} />
                ))}
            </ContentContainer>
        </MainContainer>
    );
};

export default ProjectPage;
