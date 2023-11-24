import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getPart6Questions = createAsyncThunk(
    "part6/getPart6Questions",
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

const part6Slice = createSlice({
    name: "part6",
    initialState: initialState,
    reducers: {
        setAnswerByIndexPart6(state, action){
            if (action.payload?.index >= state.questions.length){
                return;
            }
            state.questions[action.payload.index].questionList[action.payload.indexInQuestionList].yourAnswer 
            = action.payload.userAnswer;
            state.questions[action.payload.index].questionList[action.payload.indexInQuestionList].isSelected = true;
        },
        setSelectedForIndexPart6(state, action){
            if (action.payload?.index >= state.questions.length){
                return;
            }
            state.questions[action.payload.index].questionList[0].isSelected = true;
            state.questions[action.payload.index].questionList[1].isSelected = true;
            state.questions[action.payload.index].questionList[2].isSelected = true;
            state.questions[action.payload.index].questionList[3].isSelected = true;
        }
    },
    extraReducers: builder => {
        builder.addCase(getPart6Questions.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
        })
        builder.addCase(getPart6Questions.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.questions = action.payload;
        })
        builder.addCase(getPart6Questions.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
        })
    }
})


export const { setAnswerByIndexPart6, setSelectedForIndexPart6 } = part6Slice.actions;
export default part6Slice.reducer;