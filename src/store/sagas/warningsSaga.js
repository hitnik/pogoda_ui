const {put, call} = ReduxSaga.effects;
import getWarnings from '../../actions/weatherActions/api';
import {
        requestedWarnings, requestedWarningsSuccess,
        fetchWarnings
        } from '../slices/warnings';
import { takeLatest } from 'redux-saga/effects';

function* watchFetchWarnings(){
    yield takeLatest(fetchWarnings, fetchWarningsAsync);
}

function* fetchWarningsAsync(){
    yield put(requestedWarnings());
    const data = yield call(getWarnings())
                        .then( response => response.json())
    yield call(() => console.log(data))
      
}