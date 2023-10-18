import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchCategoryProducts = createAsyncThunk(
    'products/category/',
    async ({ category }, { rejectWithValue }) => {
        try {
            const apiUrl = '/api/products/categories/' + category;
            //'http://localhost:1000'+
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


const categorySlice = createSlice({
    name: 'categoryProducts',
    initialState: {
        items: [],
        loading: false,
        error: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategoryProducts.pending, (state, action) => {
                state.loading = true
                state.error = null;
            })
            .addCase(fetchCategoryProducts.fulfilled, (state, action) => {
                state.items = action.payload
                state.loading = false
                state.error = null;
            })
            .addCase(fetchCategoryProducts.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})


export default categorySlice.reducer