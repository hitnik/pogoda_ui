import { takeLatest, put, call} from 'redux-saga/effects';
import {requestedSiteData, rejectedSiteData, successedSiteData} from '../store/slices/forumsSlice';
import { getSites } from '../actions/forumsApi/api';

function* fetchSiteDataAsync(action){
    const data = action.payload;
    try {
        yield put(requestedSiteData());
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


function* watchfetchSiteDataSaga(){
    yield takeLatest('forums/fetchSiteData', fetchSiteDataAsync);
};

export default watchCodeSaga;