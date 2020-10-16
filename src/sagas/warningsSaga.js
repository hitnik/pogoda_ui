import { takeLatest, put, call, delay, takeEvery } from 'redux-saga/effects';
import { requestedWarnings, successedWarnings,
        rejectedWarnings, updateWarningsArr, 
        requestedWarningsNext, successedWarningsNext,
        } from '../store/slices/warningsSlice';
import {getWarnings,getHazardLevel,get } from '../actions/weatherActions/api';
import store from '../index';


function* clearDataAsync() {
        const data = yield call(() => {return store.getState().warnings.dataRaw});
        for (const i in  data.results) {
                const  level = yield call(() => { return getHazardLevel(data.results[i].hazard_level)
                                                .then(res => res.json());
                });
                let clone = Object.assign({}, data.results[i]);
                clone.hazard_level = level;
                yield put(updateWarningsArr(clone));
                yield delay(500);
        }             
}

function* fetchWarningsAsync() {
        try {
                yield put(requestedWarnings());
                yield delay(1000);
                const data = yield call(() => {
                return getWarnings()
                        .then(response => response.json())
                });
                yield put(successedWarnings(data)); 
        } catch (error) {
                console.log(error)
                yield put(rejectedWarnings(error.message));
        }
}

function* fetchWarningsNextAsync() {
        try {
                const next = store.getState().warnings.dataRaw.next;
                yield delay(1000);
                const data = yield call(() => {
                return get(next)
                        .then(response => response.json())
                });
                console.log(data)
                yield put(successedWarningsNext(data)); 
        } catch (error) {
                console.log(error)
                yield put(rejectedWarnings(error.message));
        }
}

        
function* watchFetchWarnings() {
        yield takeLatest('warnings/fetchWarnings', fetchWarningsAsync);
}

function* watchSuccesedWarnings() {
        yield takeLatest('warnings/successedWarnings', clearDataAsync);
}

function* watchSuccesedWarningsNext() {
        yield takeLatest('warnings/successedWarningsNext', clearDataAsync);
}

function* watchFetchWarningsNext() {
        yield takeLatest('warnings/fetchWarningsNext', fetchWarningsNextAsync);
}        
        
export  {watchFetchWarnings, watchSuccesedWarnings,
        watchFetchWarningsNext, watchSuccesedWarningsNext
        }