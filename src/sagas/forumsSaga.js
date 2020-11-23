import {  takeEvery, put, call, fork} from 'redux-saga/effects';
import {requestedSiteData, rejectedSiteData, successedSiteData,
        fetchSitesCount, succesedSitesCount, succesedForums,
        succesedTopics, requestedForums,
        } from '../store/slices/forumsSlice';
import { getSites, getSitesCount, getForums, getTopics } from '../actions/forumsApi/api';
import store from '../index';
import {convertDateToLocalIso}  from '../utils';

function* fetchSiteDataAsync(){
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
    let siteData =  store.getState().forumsSlice.siteData.data;
    let result = [];
    try {
        for (let i = 0; i < siteData.length; i++) {
            const data = yield call(async () => {
                return await getSitesCount(siteData[i].count)
                .then(response =>{
                    if(!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                    })
            });
            result.push({id: siteData[i].id , name: siteData[i].name,
                         short: siteData[i].short, 
                         count: data.count, forums: siteData[i].forums
                        })    
        };
        yield put(succesedSitesCount(result));
    } catch (error) {
        console.log(error)
        yield put(rejectedSiteData(error.message));
    }
    
}

function* fetchForumsAsync() {
    const forumsSlice =  store.getState().forumsSlice;
    try {
        yield put(requestedForums());
        const data = forumsSlice.siteData.data[forumsSlice.siteMenuActiveIndex];

        if (!data) return

        const date = convertDateToLocalIso(forumsSlice.date)
        const respData = yield call(async () => {
        return await getForums(data.forums, date)
                .then(response =>{
                    if(!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                    })
        });
        yield put(succesedForums(respData)); 
    } catch (error) {
        console.log(error)
        yield put(rejectedSiteData(error.message));
    }
}

function* fetchTopicsAsync(){
    const forumsSlice =  store.getState().forumsSlice;
    try {
        if (forumsSlice.forumsMenuActiveIndex == null) return
        if(!forumsSlice.forums[forumsSlice.forumsMenuActiveIndex]) return
        
        let url = forumsSlice.forums[forumsSlice.forumsMenuActiveIndex].topicsUrl;
        let results = [];
        let respData = {}
        do {
            if (respData.next){
                url = respData.next
            }
            respData = yield call(async () => {
                return await getTopics(url)
                    .then(response =>{
                        if(!response.ok) {
                            throw new Error(response.statusText);
                        }
                        return response.json();
                        })
            });
            results = results.concat(respData.results)
          } while (respData.next);
        yield put(succesedTopics(results)); 
    } catch (error) {
        console.log(error)
        yield put(rejectedSiteData(error.message));
    }
}

function* watchFetchForumsSaga(){
    yield takeEvery('forums/fetchForums', fetchForumsAsync);
};

function* watchFetchSiteDataSaga(){
    yield takeEvery('forums/fetchSiteData', fetchSiteDataAsync);
};

function* watchFetchSitesCountSaga(){
    yield takeEvery('forums/fetchSitesCount', fetchSitesCountAsync);
}

function* watchFetchTopicsSaga(){
    yield takeEvery('forums/fetchTopics', fetchTopicsAsync);
}

function* forumsRootSaga(){
    yield fork(watchFetchSiteDataSaga);
    yield fork(watchFetchSitesCountSaga);
    yield fork(watchFetchForumsSaga);
    yield fork(watchFetchTopicsSaga)
}

export default forumsRootSaga;