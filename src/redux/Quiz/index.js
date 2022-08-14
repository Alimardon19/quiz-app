import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const quiz = createSlice({
    name: 'quiz',
    initialState: {
        quiz: [],
        count: 1,
        checkGetQuiz: true,
        modal: false
    },
    reducers: {
        updateState: (state, action) => {
            state.quiz = action.payload.map(e => {
                let arr = e.incorrect_answers;
                let shuffledArray = [...arr, e.correct_answer]
                let sortArr = shuffledArray.sort((a, b) => 0.5 - Math.random())
                return {...e, incorrect_answers: sortArr};
            });
        },
        startGetQuiz: (state, action) => {
            state.checkGetQuiz = action.payload
        },
        clearQuizState: (state, action) => {
            state.quiz = [];
        },
        updateCount: (state, action) => {
            state.count = action.payload;
        },
        updateModal: (state, action) => {
            state.modal = action.payload
        }
    }
});

export const getQuiz = (amount, category) => {
    return (dispatch) => {
        axios.get('https://opentdb.com/api.php', {
            params: {amount, category}
        }).then((response) => {
            dispatch({
                type: 'quiz/updateState',
                payload: response.data.results
            })
        })
    }
}


export const {updateCount, updateModal, clearQuizState, startGetQuiz} = quiz.actions;
export default quiz.reducer;