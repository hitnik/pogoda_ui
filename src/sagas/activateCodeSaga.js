import { takeLatest, put, call, delay, takeEvery} from 'redux-saga/effects';
import {requestedCode, rejectedCode, successedCode} from '../store/slices/codeData';



function* fetchCodeAsync(){
    try {
        yield put(requestedWarnings());
        yield delay(1000);
        const data = yield call(() => {
        return getActualWarnings()
                .then(response => response.json())
        });
        yield put(successedWarnings(data)); 
} catch (error) {
        console.log(error)
        yield put(rejectedWarnings(error.message));
}
};

const activateCode = createAsyncThunk(
    'codeData/activate',
    (data, thunkAPI) =>{
        return sendCode(data.code, data.token, data.url)
        .then(response =>{
            if(!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(json =>{
            return json;
        });
    }
)


function* watchCode(){
    yield takeEvery('codeData/fetchCode', fetchCodeAsync)
};

export default watchCode;