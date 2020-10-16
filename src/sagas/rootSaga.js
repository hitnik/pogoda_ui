import {all} from 'redux-saga/effects';
import {watchFetchWarnings, watchSuccesedWarnings,
        watchFetchWarningsNext, watchSuccesedWarningsNext
        } from './warningsSaga';

export default function* rootSaga(){
    yield all([
        watchFetchWarnings(),
        watchSuccesedWarnings(),
        watchFetchWarningsNext(),
        watchSuccesedWarningsNext()
        ]);
};

