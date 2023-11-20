
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPart2Questions = createAsyncThunk(
    "part2/getPart2Questions",
    async (params, thunkAPI) => {
        const uri  = params.uri ?? null;
        if (uri){
            const res = await axios.get(uri)
            res.data = res.data.map(item => {
                return {
                    ...item,
                    yourAnswer: null,
                }
            })
            return res.data;
        } else {
            thunkAPI.rejectWithValue({
                message: "uri is null"
            })
        }
    }
)

const initialValue = {
    questions: [
        
    ],
    isLoading: false,
    isError: false,
    isSuccess: false
}

const part2Slice = createSlice({
    name: "part2",
    initialState: initialValue,
    reducers: {
        setAnswerByIndexPart2(state, action){
            if (action.payload?.index >= state.questions.length){
                return;
            }
            state.questions[action.payload.index].yourAnswer = action.payload.userAnswer;
        }
    },
    extraReducers: builder => {
        builder.addCase(getPart2Questions.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
        })
        builder.addCase(getPart2Questions.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.questions = action.payload
            console.log(action.payload)
        })
        builder.addCase(getPart2Questions.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
        })
    }
})

export const { setAnswerByIndexPart2 } = part2Slice.actions;
export default part2Slice.reducer;


