import { createSlice, createAction} from '@reduxjs/toolkit';
import { takeLatest, takeEvery, put, call } from 'redux-saga/effects';

const initialState = {
    data: {},
    loading: false,
    responseError: null,
    errorMessage:''
};


const warningsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'REQUESTED_WARNINGS':
        return {
            data:'',
            loading : true,
            responseError : false,
            errorMessage: ''
        };
      case 'REQUESTED_WARNINGS_SUCCEEDED':
        return {
            data: action.payload,
            loading : false,
            responseError : false,
            errorMessage: ''
        };
      case 'REQUESTED_WARNINGS_FAILED':
        return {
            data: '',
            loading : false,
            responseError : true,
            errorMessage: action.error
        };
      default:
        return state;
    }
  };
  
// Action Creators
const requestedWarnings = createAction('REQUESTED_WARNINGS');
  
const requestedWarningsSuccess = (data) => {
    return { type: 'REQUESTED_WARNINGS_SUCCEEDED', data: data.message }
  };
  
  const requestWarningsError = () => {
    return { type: 'REQUESTED_WARNINGS_FAILED' }
  };
  
  const fetchWarnings = createAction('FETCH_WARNINGS');

// const warningsSlice = createSlice({
//     name: 'codeData',
//     initialState:init,
//     reducers:{
//         requestedWarnings:(state, action) => {
//             state.loading = true;
//             state.responseError = false;
//             state.errorMessage = '';
//         },
//         requestedWarningsSuccess:(state, action) => {
//             state.loading = false;
//             state.responseError = false;
//             state.errorMessage = '';
//             state.data = action.data;
//         },
//         fetchWarnings: () => {}
//     }
// })



function* fetchWarningsAsync(){
    yield console.log('start');
    // const data = yield call(getWarnings())
    //                     .then( response => response.json())
    // yield call(() => console.log(data))
      
}

function* watchFetchWarnings(){
    yield takeEvery('FETCH_WARNINGS', fetchWarningsAsync);
}

export  { requestedWarnings, requestedWarningsSuccess,
                fetchWarnings, watchFetchWarnings
        } ;


export default warningsReducer;