import { takeLatest, takeEvery, put, call} from 'redux-saga/effects';
import {requestedSiteData, rejectedSiteData, successedSiteData} from '../store/slices/forumsSlice';
import { getSites } from '../actions/forumsApi/api';
import store from '../index';
import {convertDateToLocalIso, convertDateToLocalRu}  from '../utils';

function* fetchSiteDataAsync(){
    console.log("fetch site data")
    try {
        yield put(requestedSiteData());
        const respData = yield call(async () => {
        return await getSites()
                .then(response =>{
                    if(!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                    })
        });
        const date = convertDateToLocalIso(store.getState().forumsSlice.date);
        
        yield put(successedSiteData(respData)); 
    } catch (error) {
        console.log(error)
        yield put(rejectedSiteData(error.message));
    }
}


function* watchFetchSiteDataSaga(){
    yield takeEvery('forums/fetchSiteData', fetchSiteDataAsync);
};

export default watchFetchSiteDataSaga;