import {put, call, takeEvery} from 'redux-saga/effects';
import {requestedDogSuccess, requestedDog, requestedDogFailed,} from '../store/slices/dogSlice'

function* fetchDogAsync() {
    try {
      yield put(requestedDog());
      console.log('request')
      const data = yield call(() => {
        return fetch('https://dog.ceo/api/breeds/image/random')
                .then(res => res.json())
        }
      );
      yield put(requestedDogSuccess(data));
    } catch (error) {
      yield put(requestedDogFailed());
    }
  }


function* watchFetchDog() {
    yield takeEvery('dog/fetchDog', fetchDogAsync);
  }
  
  
export default watchFetchDog;