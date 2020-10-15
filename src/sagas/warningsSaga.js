import { takeLatest, put, call, delay } from 'redux-saga/effects';
import { requestedWarnings, successedWarnings,
        rejectedWarnings, updateWarningsArr, 
        } from '../store/slices/warningsSlice';
import {getWarnings,getHazardLevel } from '../actions/weatherActions/api';
import store from '../index';


function* clearDataAsync() {
        const data = yield call(() => {return store.getState().warnings.dataRaw});
        for (const i in  data.results) {
                const  level = yield call(() => { return getHazardLevel(data.results[i].hazard_level)
                                                .then(res => res.json());
                });
                let clone = Object.assign({}, data.results[i]);
                clone.hazard_level = level;
                yield put(updateWarningsArr(clone));
        }
              
        // yield data.results.map(item => {
        //         const level = 
        //         console.log(level);
                // let clone = Object.assign({}, data);
                
                // yield call(() => getHazardLevel(data.hazard_level)
                //         .then(res => clone.hazardLevel=res.json())
                // );
                // yield put(updateWarningsArr(clone));
                // //set needUpdate flag

}

function* fetchWarningsAsync() {
        try {
                yield put(requestedWarnings());
                console.log('request')
                yield delay(1000);
                const data = yield call(() => {
                return getWarnings()
                        .then(response => response.json())
                });
                yield put(successedWarnings(data)); 
        } catch (error) {
                console.log(error)
                yield put(rejectedWarnings(error.message));
        }
}
        
        
function* watchFetchWarnings() {
        yield takeLatest('warnings/fetchWarnings', fetchWarningsAsync);
}

function* watchSuccesedWarnings() {
        yield takeLatest('warnings/successedWarnings', clearDataAsync);
}

        
        
export  {watchFetchWarnings, watchSuccesedWarnings}