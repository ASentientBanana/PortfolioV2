import { createContext, ReactNode, useContext, useState } from 'react';

interface INavContextState {
  currentPage: number;
  changePage: (page: number) => void;
}

const DefaultNavState: INavContextState = {
  currentPage: 0,
  changePage: () => {},
};

const NavContext = createContext<INavContextState>(DefaultNavState);
const NavContextProvider = ({ children }: {children:ReactNode}) => {
  const [navState, setNavState] = useState({ currentPage:0 });
  const navSetter = (pageIndex:number) => {
    setNavState({...navState,currentPage:pageIndex});
  }
  return (
    <NavContext.Provider
      value={{
        changePage:navSetter,
        ...navState
      }}
    >
      {children}
    </NavContext.Provider>
  );
};

const useNavigator = () => useContext(NavContext);

export { NavContext, NavContextProvider, useNavigator };
