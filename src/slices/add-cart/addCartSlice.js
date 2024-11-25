import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
    value: 0,
    product: [{ id: "1", name: "apple" }]
};

// Create slice
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

// Export actions
export const { addToCart, removeFromCart } = counterSlice.actions;

// Export reducer
export default counterSlice.reducer;

