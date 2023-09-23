import { Container, styled } from '@mui/material';
import ProjectTile from '../components/projectTile';
import { IProject } from '../types';
import { PageTitle } from '../components/pageTitle';

export async function getServerSideProps() {
    const defaultReturn = {
        props: {
            baseURL: '',
            projects: [],
        },
    };
    try {
        const baseUrl = process.env.BASE_URL;
        const response = await fetch(`${baseUrl}/portfolio/get-projects`);
        const projectData = await response.json();

        if (!response.ok) {
            return defaultReturn;
        }
        return {
            props: {
                baseUrl,
                projects: projectData.projects,
            },
        };
    } catch (error) {
        console.error(error);
        return defaultReturn;
    }
}

const ProjectPage = ({ projects, baseUrl }: { projects: IProject[], baseUrl: string }) => {

    const MainContainer = styled(Container)({
        width: '80%',
        overflowY: 'scroll',
    });



    const ContentContainer = styled(Container)(({ theme }) => ({
        display: 'grid',
        gap: '15px',
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
            <PageTitle>Personal projects</PageTitle>
            <ContentContainer>
                {projects.map((project, index) => (
                    <ProjectTile key={index} baseURl={baseUrl} project={project} />
                )).reverse()}
            </ContentContainer>
        </MainContainer>
    );
};

export default ProjectPage;
