import { takeLatest, put, call, delay} from 'redux-saga/effects';
import { requestedSubForm, rejectedSubForm, successedSubForm,
        rejectedHazardLevels, requestedHazardLevels, successedHazardLevels,
        requestedGetUser, rejectedGetUser, successedGetUser,   
        } from '../store/slices/subForm';
import { sendSubscribe, sendUnsubscribe, getHazardLevels,
        getUser, sendEdit
        } from '../actions/weatherActions/api';
import { push } from 'connected-react-router';
import store from '../index';
import { setCodeData} from '../store/slices/codeData';
import {subscribe} from '../store/slices/isSubscribe';

function* fetchSubFormAsync(action){
    const data = action.payload;
    const state = store.getState();
    const send = () => {
        if (state.isSubscribe){
            if (state.subForm.isEdit) return sendEdit(data.title, data.email, data.hazardLevels)
            return sendSubscribe(data.title, data.email, data.hazardLevels)
            
        }
        return sendUnsubscribe(data.email)
    }
    try {
        yield put(requestedSubForm());
        const respData = yield call(() => {
            return send()
            .then(response =>{
                if(!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
        });   
        const codeData = {
            title: data.title,
            email: data.email,
            dateExpires: respData.expires,
            confirmURL: respData.code_confirm,
            targetUid: respData.target_uid,
            isEdit: state.subForm.isEdit,

        }
        yield put(successedSubForm());
        yield call(store.dispatch,setCodeData(codeData));
        yield call(store.dispatch,push('/weather/code-confirm')); 
    } catch (error) {
        yield put(rejectedSubForm(error.message));
    }
}

function* fetchGetHazardLevels(){
    try {
        yield put(requestedHazardLevels());
        const data = yield call(() => {
        return getHazardLevels()
                .then(response => response.json())
        });
        yield put(successedHazardLevels(data)); 
    } catch (error) {
        yield put(rejectedHazardLevels(error.message));
}
}

function* fetchGetUserAsync(action){
    const email = action.payload;
    try {
        yield put(requestedGetUser());
        const data = yield call(() => {
        return getUser(email)
                .then(response =>{
                    if(!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                })
        });
        yield put(successedGetUser(data)); 
        yield call(store.dispatch,subscribe);
        yield call(store.dispatch,push('/weather/subscribe')); 
    } catch (error) {
        yield put(rejectedGetUser(error.message));
    }
}

function* watchSubFormSaga(){
    yield takeLatest('subForm/fetchSubForm', fetchSubFormAsync);
};

function* watchGetHazardLevelsSaga() {
    yield takeLatest('subForm/fetchHazardLevels', fetchGetHazardLevels);
}

function* watchGetUserSaga() {
    yield takeLatest('subForm/fetchGetUser', fetchGetUserAsync);
}


export {watchSubFormSaga, watchGetHazardLevelsSaga ,watchGetUserSaga};