import { createSlice } from "@reduxjs/toolkit";

 const productSlice = createSlice({
   name: "products",
   initialState: {
     items: [],
     isToast: false,
   },
   reducers: {
     addProduct: (state, action) => {

      console.log(action, 'action');
      
       const isExist = state.items.find((item) => item.id === action.payload.id);
       if (isExist) {
         state.isToast = true;
       } else {
         const stateMan = state.items.push({ ...action.payload, quantity: 1 });
         console.log(stateMan, 'stateMan');
         
       }
     },
     increaseQuantity: (state, action) => {
       const product = state.items.find((item) => item.id === action.payload.id);
       if (product) {
         product.quantity += 1;
       }
     },
     decreaseQuantity: (state, action) => {
       const product = state.items.find((item) => item.id === action.payload.id);
       if (product && product.quantity > 1) {
         product.quantity -= 1;
       } else {
         state.items = state.items.filter((item) => item.id !== action.payload.id);
       }
     },
   },
 });

 export const { addProduct, increaseQuantity, decreaseQuantity } =
   productSlice.actions;
 export default productSlice.reducer;