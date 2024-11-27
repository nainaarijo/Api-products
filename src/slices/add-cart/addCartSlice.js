import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    value: 0,
    product: [{ id: "1", name: "apple" }]
};


export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        addToCart: (state) => {
            state.value += 1;
        },
        removeFromCart: (state) => {
            if (state.value > 0) {
                state.value -= 1;
            }
        }
    }
});


export const { addToCart, removeFromCart } = counterSlice.actions;


export default counterSlice.reducer;

