import { useState } from 'react';
import { styled } from '@mui/material';
import TableOfContents from '../components/tableOfContents';
import Sections from '../components/sections';
import _projects from '../public/_projects.json';
import { IProject } from '../types';
import SideNav from '../components/navigation/DrawerMenu';
import DiamondButton from '../components/diamondButton';

export async function getServerSideProps() {
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
  color: theme.palette.text.primary,
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'start',
}));

const Home = ({ projects }: { projects: IProject[] }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <MainContainer>
      <DiamondButton
        onlyOnMobile
        verticalAlign="left"
        onClickCallback={() => setOpenDrawer(true)}
        text="☰"
      />
      <SideNav open={openDrawer} setOpen={setOpenDrawer} />
      <TableOfContents />
      <Sections projects={projects} />
    </MainContainer>
  );
};

export default Home;
