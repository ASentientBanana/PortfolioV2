import Reat, { useContext } from 'react';
import { Container, styled } from '@mui/material';
import TableOfContentsElement from './TableOfContentsElement';
import  { useNavigator } from './../../context/navbarStore';

const MainContainer = styled(Container)(({theme})=>({
    height:'100%',
    width:'35%',
    border:'15px double black',
    padding:' 0 20px !important',
    margin:0,
    backgroundColor:theme.palette.secondary.main,
    [theme.breakpoints.down('md')]: {
        display:'none'
    },
}))


const  TableOfContents = () => {

    const pages:string[] = ['About','Contact','Projects'];
    
    const TOCTitle = styled('h1')({
        textAlign:'center',
        marginBottom:'50px',
    });

    return(
        <MainContainer>
            <TOCTitle>Table Of Contents</TOCTitle>            
            {
                pages.map((page,index)=> <TableOfContentsElement 
                name={page}
                index={index} 
                key={index} />
                )
            }
        </MainContainer>
    );
}

export default TableOfContents;
