import { styled, Container } from '@mui/material';


const MainContainer = styled('button')(({theme})=>({
    background:'none',
    border:'none',

    cursor:'pointer'
}));

interface IProps{
    primary:string,
    secondary:string,
    callback: () => void
}

const ThemeButton = ({primary,secondary, callback}:IProps) =>{
    const ColorContainer = styled(Container)(({theme})=>({
        height:'50%',
        paddingLeft:  '0px !important',
        paddingRight: '0px !important',
        display:'flex',
        width:'2.5rem',
        [theme.breakpoints.down('md')]: {
          width:'3rem',
        },
        [theme.breakpoints.down('sm')]: {
          width:'2rem',
        },
    }));

  return(
    <MainContainer onClick={callback}>
        <ColorContainer sx={{backgroundColor:primary}}/>
        <ColorContainer sx={{backgroundColor:secondary}}/>
    </MainContainer>
  );
}

export default ThemeButton;
