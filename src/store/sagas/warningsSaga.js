import { getWarnings } from '../../actions/weatherActions/api';
import {
        requestedWarnings, requestedWarningsSuccess,
        fetchWarnings
        } from '../slices/warnings';
import { takeLatest, put, call } from 'redux-saga/effects';

function* watchFetchWarnings(){
    yield takeLatest('FETCH_WARNINGS', fetchWarningsAsync);
}

function* fetchWarningsAsync(){
    console.log('start');
    yield put(requestedWarnings());
    const data = yield call(getWarnings())
                        .then( response => response.json())
    yield call(() => console.log(data))
      
}

export {watchFetchWarnings}