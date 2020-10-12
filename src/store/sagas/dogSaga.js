import {put, call, takeEvery} from 'redux-saga/effects';
import {requestDog, requestDogSuccess, requestDogError, fetchDog} from '../actions/dogActions'

function* fetchDogAsync() {
    try {
      yield put(requestDog());
      console.log('request')
      const data = yield call(() => {
        return fetch('https://dog.ceo/api/breeds/image/random')
                .then(res => res.json())
        }
      );
      yield put(requestDogSuccess(data));
    } catch (error) {
      yield put(requestDogError());
    }
  }


function* watchFetchDog() {
    yield takeEvery('FETCHED_DOG', fetchDogAsync);
  }
  
  
export default watchFetchDog;