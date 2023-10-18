import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginAsync = createAsyncThunk("auth/login", async ({ email, password }, { rejectWithValue }) => {
    try {
        const apiUrl = '/api/auth/login';
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("User not found");
            } else if (response.status === 400) {
                throw new Error("Invalid Credentials");
            } else {
                throw new Error("Network response was not ok");
            }
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
});



export const signUpAsync = createAsyncThunk("auth/signup", async ({ name, email, password }, { rejectWithValue }) => {
    try {
        const apiUrl = '/api/auth/signup';
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });

        console.log(response.status);
        if (response.status === 400) {
            throw new Error("User already exists");
        }
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState: { user: null, token: null, error: null },
    reducers: {
        setCredential: (state, action) => {
            const { user, token } = action.payload
            state.user = user
            state.token = token
        },
        logout: (state, action) => {
            state.token = null
            state.user = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.fulfilled, (state, action) => {
                const { user, token } = action.payload
                state.user = user
                state.token = token
                state.error = null
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.user = null
                state.token = null
                state.error = action.payload
            })
            .addCase(signUpAsync.fulfilled, (state, action) => {
                const { user, token } = action.payload
                state.user = user
                state.token = token
                state.error = null
            })
            .addCase(signUpAsync.rejected, (state, action) => {
                state.user = null
                state.token = null
                state.error = action.payload
            })
    }
})

export const { setCredential, logout } = authSlice.actions
export default authSlice.reducer