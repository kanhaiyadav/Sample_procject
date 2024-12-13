import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signin = createAsyncThunk("user/signin", async (data, { rejectWithValue }) => {
    try {
        const response = await fetch("http://localhost:3000/api/user/signin", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        const result = await response.json();
        if (response.ok) {
            return result;
        } else {
            rejectWithValue(result);
        }
    } catch (error) {
        rejectWithValue(error);
    }
});    

export const signup = createAsyncThunk("user/signup", async (data, { rejectWithValue }) => {
    try {
        const response = await fetch("http://localhost:3000/api/user/signup", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        const result = await response.json();
        if (response.ok) {
            return result;
        } else {
            rejectWithValue(result);
        }
    } catch (error) {
        rejectWithValue(error);
    }
});


const initialState = {
    _id: "",    
    username: "",
    email: "",
    token: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.token = action.payload.token;
        },
        removeUser: (state) => {
            state.name = "";
            state.email = "";
            state.token = "";
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signin.fulfilled, (state, action) => {
            state._id = action.payload._id;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.token = action.payload.token;
        });
        builder.addCase(signup.fulfilled, (state, action) => {
            state._id = action.payload._id;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.token = action.payload.token;
        });
    }
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;