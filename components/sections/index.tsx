import { styled, Container } from '@mui/material';
import { useNavigator } from '../../context/navbarStore';
import { IProjects } from '../../types';
import About from './about';
import Contact from './contact';
import Projects from './projects';
// overflowY:'scroll',

const MainContainer = styled(Container)(({ theme }) => ({
  // border:'solid 1px blue',
  overflowY: 'scroll',
  height: '100%',
}));

const Sections = ({ projects }: { projects: IProjects[] }) => {
  const { currentPage } = useNavigator();
  const renderSection = () => {
    switch (currentPage) {
      case 0:
        return <About />;
      case 1:
        return <Contact />;
      case 2:
        return <Projects projectList={projects} />;
      default:
        return <About />;
    }
  };
  return <MainContainer>{renderSection()}</MainContainer>;
};

export default Sections;
