import { takeEvery, put, call, delay} from 'redux-saga/effects';
import { updateWarningsArr,clearWarningsArr } from '../store/slices/warningsSlice';

function* fetchWSMessage (action) {
    const payload = action.payload;
    if (payload.response === 'ok'){
        if (payload.payload && payload.payload !== "pong" && payload.payload !== 'empty'){
            yield delay(500);
            yield put(clearWarningsArr());
            for (const i in payload.payload){
                yield put(updateWarningsArr(payload.payload[i]));
            }
        }
    }


}

function* watchFetchWSMessageSaga(){
    yield takeEvery('weatherSocket/receiveMessage', fetchWSMessage);
}

export {watchFetchWSMessageSaga}