import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

 export const placeOrderAsync = createAsyncThunk('order/place', async ({ data, token }, { rejectWithValue }) => {
    try {
        const apiUrl =  '/api/orders/place';
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({data}),
        });
        return await response.json();
    } catch (error) {
        throw error;
    }
})

export const fetchOrdersAsync = createAsyncThunk('order/fetch', async ({ token }, { rejectWithValue }) => {
    try {
        const apiUrl = '/api/orders';
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        const data = await response.json();
        return data;
    } catch (error) {
        throw error
    }
})

const orderSlice = createSlice({
    name: "order",
    initialState: {
        orders: [],
        error: null,
        loading: false
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(placeOrderAsync.fulfilled, (state, action) => {
                state.orders = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(placeOrderAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(fetchOrdersAsync.fulfilled, (state, action) => {
                state.orders = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(fetchOrdersAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            });
    },
});

export default orderSlice.reducer;