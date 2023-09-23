import SideNav from '../navigation/DrawerMenu';
import DiamondButton from '../diamondButton';
import TableOfContents from '../tableOfContents';
import { useState, ReactChild, useContext } from 'react';
import { styled } from '@mui/material';
import ResumeButton from '../resumeButton';
import { WindowSizeContext } from '../../context/window';

interface IProps {
    children: ReactChild
}

const MainContainer = styled('div')(({ theme }) => ({
    width: '100vw',
    height: '100vh',
    overflowY: 'auto',
    background: theme.palette.secondary.main,
    color: theme.palette.text.primary,
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
}));

export const PAGES = ['About', 'Contact', 'Projects', 'Resume(CV)']

const Layout = ({ children }: IProps) => {

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
            {/* <ResumeButton /> */}
            <TableOfContents />
            {children}
        </MainContainer>
    )

}

export default Layout;
