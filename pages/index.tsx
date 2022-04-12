import type { NextPage } from 'next';
import { Container, styled } from '@mui/material';
import TableOfContents from '../components/tableOfContents';
import Sections from '../components/sections';
import _projects from '../public/_projects.json';
import { IProjects } from '../types';

export async function getStaticProps (){
    console.log('test');
    return{
        props:{
            projects:_projects
        }
    }
}

const MainContainer = styled('div')(({ theme }) => ({
  width: '100vw',
  height: '100vh',
  background: theme.palette.secondary.main,
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  justifyContent:'start',
  [theme.breakpoints.up('md')]: {
    // display: 'flex',
    // flexDirection: 'row'
  },
}));

const Home = ({projects}:{projects:IProjects[]}) => {

  return (
    <MainContainer>
      <TableOfContents />
      <Sections projects={projects} />
    </MainContainer>
  );
};

export default Home;
