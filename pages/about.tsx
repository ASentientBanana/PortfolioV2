import Image from 'next/image';
import { styled, Container } from '@mui/material';
import { PageTitle } from '../components/pageTitle';

const ImageContainer = styled(Container)(({ theme }) => ({
    height: '158px',
    width: '158px',
    float: 'left',
    borderRadius: '10%',
    paddingTop: '20px',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
        float: 'none',
    },
}));

const ImageMe = styled(Image)(({ theme }) => ({
    borderRadius: '10%',
}));



const AboutText = styled('p')({
    fontWeight: 'bolder',
});

const MainContainer = styled(Container)(({ theme }) => ({
    padding: '0',
    userSelect: 'none',
    width: '80%',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
        display: 'flex',
        flexDirection: 'column',
    },
}));

const ContentContainer = styled(Container)({});
const TechContainer = styled(Container)(({ theme }) => ({
    maxWidth: '80%',
    textAlign: 'left',
    [theme.breakpoints.up('md')]: {
        maxWidth: '70%',

    },
    [theme.breakpoints.down('sm')]: {
        maxWidth: '100%',

    },
}));


const listOfTech = [
    'React',
    'React Native',
    'NextJS',
    'Go',
    'Typescript',
    'NodeJS',
    'Flutter',
    'C#',
    'VueJS',
    'Firebase',
    'Unity3D',
];

const About = () => {
    return (
        <MainContainer>
            <PageTitle>About Me</PageTitle>
            <ContentContainer>
                <ImageContainer>
                    <ImageMe
                        height={128}
                        width={128}
                        src={'/assets/me.jpg'}
                        layout='responsive'
                        alt="user image"
                    />
                </ImageContainer>
                <AboutText>
                    My name is Petar Kocic, and I am a developer with a fervent passion for innovation and technology.
                    I find immense joy in the process of creating, building, and experimenting with various technologies.
                    My journey in the tech realm has been one of continuous growth and learning.

                    <br />I started out as a freelancer front end developer, went to game dev and unity than back to web dev.
                    During my career i had the opertunity to be in a position of a dev, project manager to CTO while still having to program daily.
                </AboutText>
                <section>
                    <AboutText>Tech i used:</AboutText>
                    <TechContainer>
                        {listOfTech.map((tech) => (
                            <span key={tech}>{tech}, </span>
                        ))}
                    </TechContainer>
                </section>
                <AboutText>
                    Along with programming i also love learning about, tinkering with and
                    using linux (and yes i do use Arch Btw).
                </AboutText>
            </ContentContainer>
        </MainContainer>
    );
};

export default About;
