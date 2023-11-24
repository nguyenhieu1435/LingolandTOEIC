import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

export const fetchSignIn = createAsyncThunk(
    "account/signIn",
    async (params, thunkAPI) => {
        if (!params.username || !params.password){
            thunkAPI.rejectWithValue({
                message: "username or password is null"
            })
        }
        const {username, password} = params;
        try {
            const res = await axios.get(`https://n38s2n-3000.csb.app/accounts?username=${username}&password=${password}`)
            if (res.data.length > 0){
                return res.data[0];
            } else {
                thunkAPI.rejectWithValue({
                    message: "username or password is incorrect"
                })
            }
        } catch (error) {
            thunkAPI.rejectWithValue({
                message: "username or password is incorrect"
            })
        }
        return res.data;
    }
)


const initialState = {
    account: null,
    isLoading: false,
    isError: false,
    isSuccess: false
}

const accountSlice = createSlice({
    name: "account",
    initialState: initialState,
    reducers: {
       
    },
    extraReducers: builder => {
        builder.addCase(fetchSignIn.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
        })
        builder.addCase(fetchSignIn.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.account = action.payload;
        })
        builder.addCase(fetchSignIn.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
        })
    }
})

export default accountSlice.reducer;
