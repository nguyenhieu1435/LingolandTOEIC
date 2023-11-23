import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getPart5Questions = createAsyncThunk(
    "part5/getPart5Questions",
    async (params, thunkAPI) => {
        const uri = params.uri ?? null;
        if (uri){
            const res = await axios.get(uri)

            res.data = res.data.map(item => {
                return {
                    ...item,
                    yourAnswer: null,
                    isSelected: false
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

const initialState = {
    questions: [],
    isLoading: false,
    isError: false,
    isSuccess: false
    
}

const part5Slice = createSlice({
    name: "part5",
    initialState: initialState,
    reducers: {
        setAnswerByIndexPart5(state, action){
            if (action.payload?.index >= state.questions.length){
                return;
            }
            state.questions[action.payload.index].yourAnswer = action.payload.userAnswer;
            state.questions[action.payload.index].isSelected = true;
        },
        setSelectedForIndexPart5(state, action){
            if (action.payload?.index >= state.questions.length){
                return;
            }
            state.questions[action.payload.index].isSelected = true;
        }
    },
    extraReducers: builder => {
        builder.addCase(getPart5Questions.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
        })
        builder.addCase(getPart5Questions.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.questions = action.payload;
        })
        builder.addCase(getPart5Questions.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
        })
    }
})

export const { setAnswerByIndexPart5, setSelectedForIndexPart5 } = part5Slice.actions;
export default part5Slice.reducer;