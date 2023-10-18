import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        token: null,
        items: []
    },
    reducers: {
        addItemToCart: (state, action) => {
            const { data } = action.payload;
            const index = state.items.findIndex(item => item.data.productId === data.productId);
            if (index >= 0) {
                state.items[index].quantity += 1;
            }
            else state.items.push({ data: data, quantity: 1 });
        },
        removeItemFromCart: (state, action) => {
            const { productId } = action.payload;
            const index = state.items.findIndex(item => item.data.productId === productId);
            if (index >= 0 && state.items[index].quantity > 1) {
                state.items[index].quantity -= 1;
            }
            else state.items = state.items.filter(item => item.data.productId !== productId);
        },
        emptyCart: (state,action)=>{
            state.items = []
        }
    },
    extraReducers: (builder) => {
        //builder 
        // .addCase(addItemToCartAsync.fulfilled, (state, action) => {
        //     state.items.push(action.payload); // Add the item to the local state after it's added to the database
        //   })
        //   .addCase(removeItemFromCartAsync.fulfilled, (state, action) => {
        //     state.items = state.items.filter(item => item.id !== action.payload); // Remove the item from the local state after it's removed from the database
        //   });
    },
});

export const { addItemToCart, removeItemFromCart ,emptyCart} = cartSlice.actions;

export default cartSlice.reducer;