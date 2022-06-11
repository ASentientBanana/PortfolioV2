import { styled, Container } from '@mui/material';

const MainContainer = styled(Container)(({ theme }) => ({
    width: '100%',
    border: 'solid 1px red',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
}));


const MessageHeader = styled('h1')({
    fontSize: '3rem'
});


const Custom404 = () => {

    return (
        <MainContainer>
            <MessageHeader>404</MessageHeader>
            <MessageHeader>Page Not Found</MessageHeader>
        </MainContainer>
    )
}

export default Custom404;