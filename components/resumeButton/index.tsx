
import { Button, Container, styled } from '@mui/material';
import SvgComponent from './document';
import Link from 'next/link';
import getConfig from 'next/config';

const DocumentImage = styled(SvgComponent)(({ theme }) => ({
    fill: theme.palette.primary.main
}));

const MainContainer = styled(Container)(({ theme }) => ({
    border: `double 4px ${theme.palette.primary.main}`,
    borderRadius: '50%',
    height: '4rem',
    width: '4rem',
    paddingLeft: '0px !important',
    paddingRight: '0px !important',
    position: 'absolute',
    bottom: '2rem',
    right: '2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
}))

const ResumeButton = () => {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    return (
        <Link href={`${siteUrl}/assets/resume.pdf`}>
            <MainContainer>
                <DocumentImage width={25} height={25} alt='' src='/assets/document.svg' />
            </MainContainer>
        </Link>
    );
}

export default ResumeButton;