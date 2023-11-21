import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getPart4Questions = createAsyncThunk(
    "part4/getPart4Questions",
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


const part4Slice = createSlice({
    name: "part4",
    initialState: initialState,
    reducers: {
        setAnswerByIndexPart4(state, action){
            if (action.payload?.index >= state.questions.length){
                return;
            }
            // need logic here
            state.questions[action.payload.index].questionList[action.payload.indexInQuestionList].yourAnswer 
            = action.payload.userAnswer;
        }
    },
    extraReducers: builder => {
        builder.addCase(getPart4Questions.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
        })
        builder.addCase(getPart4Questions.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.questions = action.payload;
            console.log("action.payload", action.payload);
        })
        builder.addCase(getPart4Questions.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
        })
    }
})

export const { setAnswerByIndexPart4 } = part4Slice.actions;
export default part4Slice.reducer;