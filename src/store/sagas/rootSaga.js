import {all} from 'redux-saga/effects';
import {watchFetchWarnings} from '../slices/warnings';

export default function* rootSaga(){
    yield all([
        watchFetchWarnings(),
        ]);
};

