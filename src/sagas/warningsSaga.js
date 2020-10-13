import { takeLatest, put, call, delay } from 'redux-saga/effects';
import { requestedWarnings, succesedWarnings,
        rejectedWarnings
        } from '../store/slices/warningsSlice';
import {getWarnings} from '../actions/weatherActions/api';

function* fetchWarningsAsync() {
        try {
                yield put(requestedWarnings());
                console.log('request')
                yield delay(1000);
                const data = yield call(() => {
                return getWarnings()
                        .then(res => res.json())
                }
                );
                yield put(succesedWarnings(data));
        } catch (error) {
                yield put(rejectedWarnings(error.message));
        }
}
        
        
function* watchFetchWarnings() {
        yield takeLatest('warnings/fetchWarnings', fetchWarningsAsync);
}
        
        
export default watchFetchWarnings;