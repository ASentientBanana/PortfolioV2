import { useState } from 'react';
import { Container, styled } from '@mui/material';
import TableOfContents from '../components/tableOfContents';
import Sections from '../components/sections';
import _projects from '../public/_projects.json';
import { IProjects } from '../types';
import SideNav from '../components/navigation/DrawerMenu';

export async function getStaticProps() {
  return {
    props: {
      projects: _projects,
    },
  };
}

const MainContainer = styled('div')(({ theme }) => ({
  width: '100vw',
  height: '100vh',
  background: theme.palette.secondary.main,
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'start',
  [theme.breakpoints.up('md')]: {
    // display: 'flex',
    // flexDirection: 'row'
  },
}));

const OpenDrawerButton = styled('button')(({ theme }) => ({
  height: '40px',
  width: '40px',
  position: 'absolute',
  top: '20px',
  left: '40px',
  background: 'transparent',
  border: 'black 3px double',
  transform: 'rotate(45deg)',
  display: 'none',
  [theme.breakpoints.down('md')]: {
    display: 'block',
  },
}));

const Line = styled('span')({
  margin: '-4px 0',
  fontWeight: '40px',
  // fontSize:'17px'
});

const LineContainer = styled('div')({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transform: 'rotate(-45deg)',
});

const Home = ({ projects }: { projects: IProjects[] }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <MainContainer>
      <OpenDrawerButton onClick={() => setOpenDrawer(true)}>
        <LineContainer>
          <Line>___</Line>
          <Line>___</Line>
          <Line>___</Line>
        </LineContainer>
      </OpenDrawerButton>
      <SideNav open={openDrawer} setOpen={setOpenDrawer} />
      <TableOfContents />
      <Sections projects={projects} />
    </MainContainer>
  );
};

export default Home;
