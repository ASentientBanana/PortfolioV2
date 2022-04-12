import { styled, Drawer, List, ListItem } from '@mui/material';

const DrawerMenu = styled(Drawer)(({ theme }) => ({
  width: '60vw',
  [theme.breakpoints.down('md')]: {
    display: 'block',
  },
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

const DrawerList = styled(ListItem)({
  width: '60vw',
  border: 'solid 1px red',
});

const MobileDrawer = () => {
  return (
    <DrawerMenu open anchor={'left'}>
      <List>
        <DrawerList>ITEM</DrawerList>
      </List>
    </DrawerMenu>
  );
};

export default MobileDrawer;
