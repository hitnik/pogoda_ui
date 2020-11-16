import { takeLatest, takeEvery, put, call, fork} from 'redux-saga/effects';
import {requestedSiteData, rejectedSiteData, successedSiteData,
        fetchSitesCount, succesedSitesCount
        } from '../store/slices/forumsSlice';
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
        yield put(successedSiteData(respData)); 
        yield call(store.dispatch,fetchSitesCount());
    } catch (error) {
        console.log(error)
        yield put(rejectedSiteData(error.message));
    }
}

function* fetchSitesCountAsync(){
    console.log('fetch count')
    const forumsSlice = store.getState().forumsSlice;
    try {
        for (const i in  forumsSlice.siteData.data) {
            const count = yield call(async () => {
                return await getSitesCount(forumsSlice.siteData.data[i].count)
                .then(response =>{
                    if(!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                    })
            });
            respData[i].count = count.count;
        };
    } catch (error) {
        console.log(error)
        yield put(rejectedSiteData(error.message));
    }
    
}

function* fetchForumsAsync() {
    
}

function* watchFetchForums(){

};

function* watchFetchSiteDataSaga(){
    yield takeEvery('forums/fetchSiteData', fetchSiteDataAsync);
};

function* watchFetchSitesCountSaga(){
    yield takeEvery('forums/fetchSitesCount', fetchSitesCountAsync);
}

function* forumsRootSaga(){
    yield fork(watchFetchSiteDataSaga);
    yield fork(watchFetchSitesCountSaga);
}

export default forumsRootSaga;