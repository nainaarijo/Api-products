import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useEffect } from 'react';
import { useState } from 'react';
import { Typography } from '@mui/material';

const CartList = (props)=> {
const {open, toggleDrawer} = props;
const [cartItem,setCartItem] = useState()

useEffect(()=>{
  const CartItemArr = localStorage.getItem('CartList');
  const parseCartItemArr = JSON.parse(CartItemArr)
   
  setCartItem(parseCartItemArr);
},[]);

 

  return (
    <div>
      
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250}} role="presentation" onClick={toggleDrawer(false)}>
          <Typography variant='h5'>Cart Items</Typography>

          {
            cartItem?.map((item)=>{
              return(
              <Box>
                <img width="70px" src={item.img} alt="" />
                <span>{item.name}</span>
                <span>{item.price}</span>
                </Box>
                
              )
            })
          }

        </Box>
       
      </Drawer>
    </div>
  );
}
export default CartList;
