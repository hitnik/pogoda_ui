import { takeEvery, put, call } from 'redux-saga/effects';

const requestedWarnings = () =>{
  return {
    type:'REQUESTED_WARNINGS'
  }
}  
const requestedWarningsSuccess = (data) => {
    return { type: 'REQUESTED_WARNINGS_SUCCEEDED', data: data.message }
  };
  
const requestWarningsError = () => {
  return { type: 'REQUESTED_WARNINGS_FAILED' }
};

const fetchWarnings = () =>{
  return {
    type:'FETCH_WARNINGS'
  }
}


const initialState = {
    data: {},
    loading: false,
    responseError: null,
    errorMessage:''
};


const warnings = (state = initialState, action) => {
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
  


function* fetchWarningsAsync(){
    yield put(requestedWarnings());
    console.log('start');
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


export default warnings;