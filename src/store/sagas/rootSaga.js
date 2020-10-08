import {fork} from 'redux-saga/effects';
import watchFetchWarnings from './warningsSaga';

export default function* rootSaga(){
    yield fork(watchFetchWarnings);
};

