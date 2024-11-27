import React from "react";
import { Button, ButtonGroup, Tooltip, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { decreaseQuantity, increaseQuantity } from "../../slices/product/SliceProduct";

const CartList = (props) => {
  const { open, toggleDrawer } = props; 
  const dispatch = useDispatch();

 
  const { items } = useSelector((state) => state.product);


  const totalPrice = items.reduce(
    (sum, curr) => sum + curr.price * curr.quantity,
    0
  );

  return (
    <Drawer open={open} onClose={toggleDrawer(false)}>
      <Box className="position-relative" sx={{ height: "100vh" }}>
        <Box sx={{ width: 450 }} role="presentation">
          <Typography
            className="text-center"
            variant="h6"
          >
             Cart
          </Typography>
      
          {items.length === 0 ? (
            <Box className="text-center">
              <Typography className="text-center mt-5" variant="h6">
                Nothing to add
              </Typography>
            </Box>
          ) : (
            items.map((itemList) => (
              <Box
                key={itemList.id} 
                className="d-flex justify-content-around align-items-center my-3"
                style={{ minHeight: "80px", maxHeight: "80px" }}
              >
                <img
                  width={"40px"}
                  src={itemList?.image}
                  alt="cart item"
                />
                <span>{itemList?.category}</span>
                <ButtonGroup
                  size="small"
                  variant="text"
                  aria-label="Basic button group"
                >
                  <Button>
                    <RemoveIcon
                      className=""
                      onClick={() => dispatch(decreaseQuantity(itemList))}
                    />
                  </Button>
                  <Button>{itemList?.quantity}</Button>
                  <Button>
                    <AddIcon
                      className="text-success"
                      onClick={() => dispatch(increaseQuantity(itemList))}
                    />
                  </Button>
                </ButtonGroup>
                <span>${itemList?.price.toFixed(2)}</span>
                <Tooltip title={"Remove Item"}>
                  <Button>
                    <DeleteIcon className="" />
                  </Button>
                </Tooltip>
              </Box>
            ))
          )}
        </Box>
       
        <Box className="position-absolute bottom-0 bg-primary w-100 d-flex justify-content-between p-3 text-white">
          <Typography variant="body1">Total Price</Typography>
          <Typography variant="body1">${totalPrice.toFixed(2)}</Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CartList;
