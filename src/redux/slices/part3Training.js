import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getPart3Questions = createAsyncThunk(
    "part3/getPart3Questions",
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
const part3Slice = createSlice({
    name: "part3",
    initialState: initialState,
    reducers: {
        setAnswerByIndexPart3(state, action){
            if (action.payload?.index >= state.questions.length){
                return;
            }
           
            // need logic here
            state.questions[action.payload.index].questionList[action.payload.indexInQuestionList].yourAnswer = action.payload.userAnswer;
           
        }
    },
    extraReducers: builder => {
        builder.addCase(getPart3Questions.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
        })
        builder.addCase(getPart3Questions.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.questions = action.payload
            console.log(action.payload)
        })
        builder.addCase(getPart3Questions.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
        })
    }
})

export const { setAnswerByIndexPart3 } = part3Slice.actions;
export default part3Slice.reducer;
