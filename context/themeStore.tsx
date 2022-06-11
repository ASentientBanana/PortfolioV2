import { createContext, ReactNode, useContext, useState } from 'react';
import { Theme } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider} from '@mui/material';

interface IAvailableThemes {
  [index:string]:Theme,
  dark: Theme,
  light: Theme,
  nordFrost: Theme,
  silver: Theme,
  lime: Theme
}

interface IThemeState {
  currentTheme:Theme
}

const availableThemes:IAvailableThemes = {
  light: createTheme({
    palette: {
      primary: {
        main: '#000000',
      },
      secondary:{
        main:'#fff'
      },
      text:{
        primary:'#000000',
      }
    },
  }),
  dark:createTheme({
     palette: {
      primary: {
        main: '#D6AD60',
      },
      secondary: {
        main: '#324A60',
      },
      text:{
        primary:'#D6AD60'  
      }
    },
  }),
  nordFrost:createTheme({
    palette: {
      primary: {
        main: '#8FBCBB',
      },
      secondary: {
        main: '#3B4252',
      },
      text:{
        primary: '#8FBCBB',
      }
    },
  }),
  silver:createTheme({
    palette: {
      primary: {
        main: '#EFEEE9',
      },
      secondary: {
        main: '#282628',
      },
      text:{
        primary: '#EFEEE9',
      }
    },
  }),
  lime:createTheme({
    palette: {
      primary: {
        main: '#B1D8B7',
      },
      secondary: {
        main: '#1D3537',
      },
      text:{
        primary: '#B1D8B7',
      }
    },
  }),
}

interface IThemeContextState {
  currentTheme:Theme,
  setTheme: (theme:string) => void
}

const NavContext = createContext<IThemeContextState>({
  currentTheme: availableThemes.nordFrost,
  setTheme: () => {}
});

const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [ themeState, setThemeState ] = useState<IThemeState>({
      currentTheme: availableThemes.nordFrost,
    });
  
  const setTheme = (theme: string) =>{
    if(Object.keys(availableThemes).includes(theme))
      setThemeState({currentTheme:availableThemes[theme]});
      if(typeof window !== 'undefined'){
        sessionStorage.setItem('kole-profile-theme',theme);
      }
    else
      setThemeState({currentTheme:availableThemes.nordFrost});
  } 

  return (
    <NavContext.Provider
      value={{
          currentTheme: themeState.currentTheme,
          setTheme 
        }}
    >
      <ThemeProvider theme={themeState.currentTheme}>
        {children}
      </ThemeProvider>
    </NavContext.Provider>
  );
};

const useTheme = () => useContext(NavContext);

export { NavContext, ThemeContextProvider, useTheme, availableThemes };
