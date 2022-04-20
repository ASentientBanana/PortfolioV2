import { styled, Container } from '@mui/material';
import { availableThemes, useTheme } from '../../context/themeStore'; 
import ThemeButton from './ThemeButton';

const PaletteContainer = styled(Container)(({ theme })=>({
    display:'flex',
    justifyContent:'space-evenly',
    padding:'5px 10px',
    position:'absolute',
    bottom:'10px',
    right:'10px',
    height:'60px',
    gap:'5px',
    background:'rgba(113,113,113,0.1)',
}));

const MainContainer = styled(Container)(({ theme })=>({
  height:'120px',
  width:'90%',
  position:'absolute',
  bottom:'10px',
  right:'10px',
  textAlign:'right'
}));

const ThemePalette = () =>{
  const { setTheme } = useTheme();
  const listOfThemes = Object.keys(availableThemes);
    return(
     <MainContainer>
       <h5>Select Theme</h5>
       <PaletteContainer>
          {
            listOfThemes.map((theme,index)=><ThemeButton
              key={index}
              primary={availableThemes[theme].palette.primary.main}
              secondary={availableThemes[theme].palette.secondary.main}
              callback={()=>setTheme(theme)}
            />)
          }
        </PaletteContainer>
      </MainContainer>
    )
  }

export default ThemePalette;
