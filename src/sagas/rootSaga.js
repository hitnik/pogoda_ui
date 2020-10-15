import {all} from 'redux-saga/effects';
import {watchFetchWarnings, watchSuccesedWarnings} from './warningsSaga';

export default function* rootSaga(){
    yield all([
        watchFetchWarnings(),
        watchSuccesedWarnings()
        ]);
};

