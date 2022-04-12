import { Tabs, Tab, Box, Typography, styled } from '@mui/material';
import { useContext, useEffect } from 'react';
import { NavContext } from '../../context/navbarStore';
import { useRouter } from 'next/router';

const MainContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  backgroundColor: theme.palette.primary.dark,
  height: '100%',
  display: 'flex',
  position: 'relative',
  width: '30vw',
  maxWidth: 'none',
  [theme.breakpoints.up('md')]: {
    display: 'block',
  },
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const TabElement = styled(Tab)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  width: '100%',
  maxWidth: 'none',
  padding: 'none',
  '&.Mui-selected': {
    color: theme.palette.primary.contrastText,
    borderBottom: `solid 1px ${theme.palette.primary.contrastText}`,
  },
}));

const NameBox = styled(Box)(({ theme }) => ({
  border: `solid 1px ${theme.palette.primary.contrastText}`,
  height: '3rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Name = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontWeight: 'bolder',
  fontSize: '2rem',
}));

const SideNav = () => {
  const navContext = useContext(NavContext);

  const NavHandler = (pageIndex: number, page: string) => {
    // navContext.changePage(pageIndex)
  };

  return (
    <MainContainer>
      <NameBox>
        <Name>Petar Kocic</Name>
      </NameBox>
      <Tabs
        value={navContext.currentPage}
        orientation="vertical"
        indicatorColor="secondary"
      >
        {/* {navContext.pages.map((page,index)=><TabElement label={page.name} key={index} onClick={()=>NavHandler(index,page.route)}/>)} */}
        <TabElement label={'page.name'} onClick={() => {}} />
        <TabElement label={'page.name'} onClick={() => {}} />
        <TabElement label={'page.name'} onClick={() => {}} />
      </Tabs>
    </MainContainer>
  );
};

export default SideNav;
