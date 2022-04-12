import { styled, Drawer, List, ListItem } from '@mui/material';
import { fontWeight } from '@mui/system';

const DrawerMenu = styled(Drawer)(({ theme }) => ({
  width: '60vw',
  position: 'relative',
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
const DrawerList = styled(List)({
  marginTop: '80px',
});
const CloseButton = styled('button')({
  background: 'transparent',
  position: 'absolute',
  border: 'black 3px double',
  top: '20px',
  right: '20px',
  width: '40px',
  height: '40px',
  cursor: 'pointer',
  transform: ' rotate(45deg)',
});

const CloseX = styled('div')({
  transform: 'rotate(-45deg)',
  fontWeight: 'bolder',
  fontSize: '1.5rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

interface IProps {
  open: boolean;
  setOpen: (x: boolean) => void;
}

const MobileDrawer = ({ open, setOpen }: IProps) => {
  return (
    <DrawerMenu open={open} anchor={'left'}>
      <CloseButton onClick={() => setOpen(false)}>
        <CloseX>
          <span>X</span>
        </CloseX>
      </CloseButton>
      <DrawerList>
        <DrawerListItem>ITEM</DrawerListItem>
        <DrawerListItem>ITEM</DrawerListItem>
        <DrawerListItem>ITEM</DrawerListItem>
        <DrawerListItem>ITEM</DrawerListItem>
      </DrawerList>
    </DrawerMenu>
  );
};

export default MobileDrawer;
