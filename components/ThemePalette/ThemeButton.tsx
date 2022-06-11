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
    const ColorContainer = styled(Container)({
        height:'50%',
        display:'flex',
    });

  return(
    <MainContainer onClick={callback}>
        <ColorContainer sx={{backgroundColor:primary}}/>
        <ColorContainer sx={{backgroundColor:secondary}}/>
    </MainContainer>
  );
}

export default ThemeButton;