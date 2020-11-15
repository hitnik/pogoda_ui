import {all} from 'redux-saga/effects';
import {watchFetchWarnings, watchSuccesedWarnings,
        watchFetchWarningsNext, watchSuccesedWarningsNext,
        } from './warningsSaga';
import watchCodeSaga from './activateCodeSaga';
import {watchSubFormSaga,watchGetHazardLevelsSaga,
        watchGetUserSaga,
        } from './subFormSaga';
import watchFetchSiteDataSaga from './forumsSaga';

export default function* rootSaga(){
    yield all([
        watchFetchWarnings(),
        watchSuccesedWarnings(),
        watchFetchWarningsNext(),
        watchSuccesedWarningsNext(),
        watchCodeSaga(),
        watchSubFormSaga(),
        watchGetHazardLevelsSaga(),
        watchGetUserSaga(),
        watchFetchSiteDataSaga(),
        ]);
};

