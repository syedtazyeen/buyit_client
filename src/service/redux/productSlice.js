import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchAllProducts = createAsyncThunk(
    'products/All',
    async (_,{ rejectWithValue }) => {
        try {
            const apiUrl = `/api/products`;
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            return result
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)


const productSlice = createSlice({
    name: 'allProducts',
    initialState: {
        items: [],
        loading: false,
        error: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.pending, (state, action) => {
                state.loading = true
                state.error = null;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.items = action.payload
                state.loading = false
                state.error = null;
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})


export default productSlice.reducer