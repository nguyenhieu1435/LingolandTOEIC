import axios from "axios";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getPart7Questions = createAsyncThunk(
    "part7/getPart7Questions",
    async (params, thunkAPI) => {
        const uri  = params.uri ?? null;
        if (uri){
            const res = await axios.get(uri)
            // array data
            let data = res.data;
            data = data.map(item =>{
                let questionList = item.questionList;
                questionList = questionList.map(question => {
                    return {
                        ...question,
                        yourAnswer: null,
                        isSelected: false,
                    }
                })
                return {
                    ...item,
                    questionList: questionList,
                }
            })
            return data;
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

const part7Slice = createSlice({
    name: "part7",
    initialState: initialState,
    reducers: {
        setAnswerByIndexPart7(state, action){
            if (action.payload?.index >= state.questions.length){
                return;
            }
            state.questions[action.payload.index].questionList[action.payload.indexInQuestionList].yourAnswer 
            = action.payload.userAnswer;
            state.questions[action.payload.index].questionList[action.payload.indexInQuestionList].isSelected = true;
        },
        setSelectedForIndexPart7(state, action){
            if (action.payload?.index >= state.questions.length){
                return;
            }
            const lengthQuestionList = state.questions[action.payload.index].questionList.length;
            for (let i = 0; i < lengthQuestionList; i++){
                state.questions[action.payload.index].questionList[i].isSelected = true;
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(getPart7Questions.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
        })
        builder.addCase(getPart7Questions.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.questions = action.payload;
        })
        builder.addCase(getPart7Questions.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
        })
    }
})

export const { setAnswerByIndexPart7, setSelectedForIndexPart7 } = part7Slice.actions;
export default part7Slice.reducer;

