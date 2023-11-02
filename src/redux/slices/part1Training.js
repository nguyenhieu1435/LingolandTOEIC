import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialValue = {
    questions: [
        
    ],
    isLoading: false,
    isError: false,
    isSuccess: false
}


const part1Slice = createSlice({
    name: "part1",
    initialState: initialValue,
    reducers: {

    }
})


export default part1Slice.reducer
