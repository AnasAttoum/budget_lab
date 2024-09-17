import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { links, subLinks } from '../constants/data';
import Header from './Header';
import Footer from './Footer';
import { useSelector } from 'react-redux';
import { RootState } from '../lib/store';

export default function LeftDrawer() {

  const {initialBalance} = useSelector((state:RootState)=>state.reducers.transactions)
  const navigate=useNavigate()
  React.useEffect(()=>{
    if(initialBalance===-1){
      navigate('/')
    }
  },[initialBalance,navigate])

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    console.log('first')
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary={'Budget Lab'} sx={{ color: 'var(--primary)' }} />
          </ListItemButton>
        </ListItem>

        {links.map(({ name, url, icon }, index) => (
          <Link to={url} key={index}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {icon}
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {subLinks.map(({ name, url, icon }, index) => (
          <Link to={url} key={index}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {icon}
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Header toggleDrawer={toggleDrawer} />

      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>

      <Outlet />

      <Footer />
    </>
  )
}