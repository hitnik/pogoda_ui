import { takeLatest, takeEvery, put, call} from 'redux-saga/effects';
import {requestedSiteData, rejectedSiteData, successedSiteData} from '../store/slices/forumsSlice';
import { getSites, getSitesCount } from '../actions/forumsApi/api';
import store from '../index';
import {convertDateToLocalIso, convertDateToLocalRu}  from '../utils';

function* fetchSiteDataAsync(){
    console.log("fetch site data")
    const date = convertDateToLocalIso(store.getState().forumsSlice.date);
    try {
        yield put(requestedSiteData());
        const respData = yield call(async () => {
        return await getSites(date)
                .then(response =>{
                    if(!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                    })
        });
        for (const i in  respData) {
            const count = yield call(async () => {
                return await getSitesCount(respData[i].count)
                .then(response =>{
                    if(!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                    })
            });
            respData[i].count = count.count;
        };
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