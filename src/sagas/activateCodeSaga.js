import { takeLatest, put, call} from 'redux-saga/effects';
import {requestedCode, rejectedCode, successedCode} from '../store/slices/codeData';
import { sendCode } from '../actions/weatherActions/api';


function* fetchCodeAsync(action){
    const data = action.payload;
    try {
        yield put(requestedCode());
        const respData = yield call(() => {
        return sendCode(data.code, data.target_uid, data.url)
                .then(response =>{
                    if(!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                    })
        });
        yield put(successedCode(respData)); 
    } catch (error) {
        yield put(rejectedCode(error.message));
    }
}


function* watchCodeSaga(){
    yield takeLatest('codeData/fetchCode', fetchCodeAsync);
};

export default watchCodeSaga;