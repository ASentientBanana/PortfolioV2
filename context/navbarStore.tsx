import { createContext, ReactNode, useContext, useState } from 'react';

interface INavContextState {
  currentPage: number;
  changePage: (page: number) => void;
  pages: string[];
}

const DefaultNavState: INavContextState = {
  currentPage: 0,
  changePage: () => {},
  pages: ['About', 'Contact', 'Projects'],
};

const NavContext = createContext<INavContextState>(DefaultNavState);
const NavContextProvider = ({ children }: { children: ReactNode }) => {
  const [navState, setNavState] = useState(DefaultNavState);
  // const pages: string[] = ['About', 'Contact', 'Projects'];
  const navSetter = (pageIndex: number) => {
    setNavState({ ...navState, currentPage: pageIndex });
  };
  return (
    <NavContext.Provider
      value={{
        ...navState,
        changePage: navSetter,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};

const useNavigator = () => useContext(NavContext);

export { NavContext, NavContextProvider, useNavigator };
