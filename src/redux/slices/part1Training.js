import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

export const getPart1Questions = createAsyncThunk(
    "part1/getPart1Questions",
    async (params, thunkAPI) => {
        const uri  = params.uri ?? null;
        if (uri){
            const res = await axios.get(uri)
            res.data = res.data.map(item => {
                return {
                    ...item,
                    yourAnswer: null,
                    isSelected: false,
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


const part1Slice = createSlice({
    name: "part1",
    initialState: initialValue,
    reducers: {
        setAnswerByIndex(state, action){
            if (action.payload?.index >= state.questions.length){
                return;
            }
            state.questions[action.payload.index].yourAnswer = action.payload.userAnswer;
            state.questions[action.payload.index].isSelected = true;
        },
        setSelectedForIndexPart1(state, action){
            if (action.payload?.index >= state.questions.length){
                return;
            }
            state.questions[action.payload.index].isSelected = true;
        }
    },
    extraReducers: builder => {
        builder.addCase(getPart1Questions.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
        })
        builder.addCase(getPart1Questions.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.questions = action.payload
            console.log(action.payload)
        })
        builder.addCase(getPart1Questions.rejected, (state, action) => {
            state.questions = []
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
        })
    }
})

export const {setAnswerByIndex, setSelectedForIndexPart1} = part1Slice.actions

export default part1Slice.reducer
