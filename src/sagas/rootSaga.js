import {all} from 'redux-saga/effects';
import {watchFetchWarnings, watchSuccesedWarnings,
        watchFetchWarningsNext, watchSuccesedWarningsNext,
        } from './warningsSaga';
import watchCodeSaga from './activateCodeSaga';
import {watchSubFormSaga,watchGetHazardLevelsSaga } from './subFormSaga';

export default function* rootSaga(){
    yield all([
        watchFetchWarnings(),
        watchSuccesedWarnings(),
        watchFetchWarningsNext(),
        watchSuccesedWarningsNext(),
        watchCodeSaga(),
        watchSubFormSaga(),
        watchGetHazardLevelsSaga(),
        ]);
};

