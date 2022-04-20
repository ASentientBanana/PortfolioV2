import { styled, Drawer, List, ListItem } from '@mui/material';
import { useNavigator } from '../../context/navbarStore';
import TableOfContentsElement from '../tableOfContents/TableOfContentsElement';
import DiamondButton from '../diamondButton';
import ThemePalette from '../ThemePalette';

const DrawerMenu = styled(Drawer)(({ theme }) => ({
  width: '60vw !important',
  position: 'relative',
  backgroundColor:theme.palette.primary.main,
  [theme.breakpoints.down('md')]: {
    display: 'block',
  },
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

const DrawerListItem = styled(ListItem)({
  width: '60vw',
});
const DrawerList = styled(List)(({ theme }) => ({
  backgroundColor:theme.palette.secondary.main,
  paddingTop:'80px',
  height:'100%'
}));

interface IProps {
  open: boolean;
  setOpen: (x: boolean) => void;
}

const MobileDrawer = ({ open, setOpen }: IProps) => {
  const { pages } = useNavigator();
  return (
    <DrawerMenu open={open} anchor={'left'}>
      <DiamondButton
        onlyOnMobile
        verticalAlign="right"
        onClickCallback={() => setOpen(false)}
        text="X"
      />
      <DrawerList>
        {pages.map((page, index) => (
          <DrawerListItem key={index}>
            <TableOfContentsElement noIndex name={page} index={index} />
          </DrawerListItem>
        ))}
      </DrawerList>
      <ThemePalette />
    </DrawerMenu>
  );
};

export default MobileDrawer;
