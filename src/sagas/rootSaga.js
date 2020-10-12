import {all} from 'redux-saga/effects';
import watchFetchDog from './dogSaga';
import watchFetchWarnings from './warningsSaga';
import watchFetchWarings from './warningsSaga';

export default function* rootSaga(){
    yield all([
        watchFetchDog(),
        watchFetchWarnings(),
        ]);
};

