import Image from 'next/image';
import { styled, Container } from '@mui/material';

const ImageContainer = styled(Container)(({ theme }) => ({
  height: '158px',
  width: '158px',
  float: 'left',
  borderRadius:'10%',
  paddingTop:'20px',
  position:'relative',
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
  width: '80%',
  margin: '0 auto',
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const ContentContainer = styled(Container)({});
const TechContainer = styled(Container)({});

const TitleText = styled('h1')({
  textAlign: 'center',
});

const listOfTech = [
  { name: 'React' },
  { name: 'React Native' },
  { name: 'NextJS' },
  { name: 'Firebase' },
  { name: 'Unity3D' },
  { name: 'NodeJS' },
];

const About = () => {
  return (
    <MainContainer>
      <TitleText>About Me</TitleText>
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
          Currently i am working as a developer using technologies mostly
          centered around front end development.
        </AboutText>
        <AboutText>
          Aside from that i also used to work as a game developer working in
          Unity3D and C# where i worked on Android and IOS Games.
        </AboutText>
        <section>
          <AboutText>Tech i worked with:</AboutText>
          <TechContainer>
            {listOfTech.map((tech, index) => (
              <span key={index}>{tech.name}, </span>
            ))}
          </TechContainer>
        </section>
        <AboutText>
          I am currently going to University for mechanical engineering majoring
          in mechanical design. A lot of math and geometry and it sometimes
          inspires some of the visualizations and calculations and in some of my
          side projects.
        </AboutText>
        <AboutText>
          Along with programming i also love learning about, tinkering with and
          using linux (and yes i do use Arch Btw).
        </AboutText>
      </ContentContainer>
    </MainContainer>
  );
};

export default About;
