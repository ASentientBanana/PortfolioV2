import { styled, Container } from '@mui/material';
import { availableThemes, useTheme } from '../../context/themeStore';
import ThemeButton from './ThemeButton';

const PaletteContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-evenly',
  padding: '5px 15px',
  position: 'absolute',
  bottom: '10px',
  right: '10px',
  height: '50px',
  background: 'rgba(113,113,113,0.2)',
  [theme.breakpoints.down('sm')]: {
    display: 'grid',
    height: '130px',
    gap: 10,
    gridTemplateColumns: '1fr 1fr'
  }
}));

const MainContainer = styled(Container)(({ theme }) => ({
  height: '120px',
  width: '90%',
  position: 'absolute',
  bottom: '10px',
  right: '10px',
  textAlign: 'right',
  [theme.breakpoints.down('sm')]: {
    width: '80%',
    height: '180px',
  }
}));

const ThemePalette = () => {
  const { setTheme } = useTheme();
  const listOfThemes = Object.keys(availableThemes);
  return (
    <MainContainer>
      <h5>Select Theme</h5>
      <PaletteContainer>
        {
          listOfThemes.map((theme, index) => <ThemeButton
            key={index}
            primary={availableThemes[theme].palette.primary.main}
            secondary={availableThemes[theme].palette.secondary.main}
            callback={() => setTheme(theme)}
          />)
        }
      </PaletteContainer>
    </MainContainer>
  )
}

export default ThemePalette;
