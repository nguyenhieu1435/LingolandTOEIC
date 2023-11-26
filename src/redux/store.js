import { configureStore, createSlice } from '@reduxjs/toolkit';
import loadingReducer from './slices/loading';
import part1TrainingReducer from './slices/part1Training';
import part2TrainingReducer from './slices/part2Training';
import part3TrainingReducer from './slices/part3Training';
import part4TrainingReducer from './slices/part4Training';
import part5TrainingReducer from './slices/part5Training';
import part6TrainingReducer from './slices/part6Training';
import part7TrainingReducer from './slices/part7Training';
import accountReducer from './slices/account';

export const VocabularySlice = createSlice({
    name: 'wordselect',
    initialState: {
        itemselectId: 1,
        URL: '',
        titleSelect: '',
        toppicSelect: {},
        wordDetailSelect: {
            vocabylary: 'abide by 1',
            mean: 'tuân theo, chấp thuận, tuân thủ',
            type: 'phrasal verb',
            spelling: '',
            sound: '',
            image: '',
            description: 'To accept or obey an agreement',
        },
        totalVocabulary: 0,
    },
    reducers: {
        setSelectItem: (state, action) => {
            state.itemselectId = action.payload;
        },
        setURL: (state, action) => {
            state.URL = action.payload;
        },
        setTitle: (state, action) => {
            state.titleSelect = action.payload;
        },
        setToppicSelect: (state, action) => {
            state.toppicSelect = action.payload;
        },
        setWordDetailSelect: (state, action) => {
            state.wordDetailSelect = action.payload;
        },
        setTotalVocabulary: (state, action) => {
            state.totalVocabulary = action.payload;
        },
    },
});

export const store = configureStore({
    reducer: {
        account: accountReducer,
        loadingLayout: loadingReducer,
        part1Training: part1TrainingReducer,
        part2Training: part2TrainingReducer,
        part3Training: part3TrainingReducer,
        part4Training: part4TrainingReducer,
        part5Training: part5TrainingReducer,
        part6Training: part6TrainingReducer,
        part7Training: part7TrainingReducer,
        vocabulary: VocabularySlice.reducer,
    },
});
