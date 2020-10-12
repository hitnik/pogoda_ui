import { takeLatest, put, call } from 'redux-saga/effects';
import { requestedWarnings, succesedWarnings,
        rejectedWarnings, fetchWarnings
        } from '../store/slices/warningsSlice';
import {getWarnings} from '../actions/weatherActions/api';
function* fetchWarningsAsync() {
        try {
                yield put(requestedWarnings());
                console.log('request')
                const data = yield call(() => {
                return getWarnings()
                        .then(res => res.json())
                }
                );
                yield put(succesedWarnings(data));
        } catch (error) {
                yield put(rejectedWarnings());
        }
}
        
        
function* watchFetchWarnings() {
        yield takeLatest('warnings/fetchWarnings', fetchWarningsAsync);
}
        
        
export default watchFetchWarnings;