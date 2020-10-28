import { takeLatest, put, call} from 'redux-saga/effects';
import { requestedSubForm, rejectedSubForm, successedSubForm } from '../store/slices/subForm';
import { sendSubscribe, sendUnsubscribe, getHazardLevels } from '../actions/weatherActions/api';
import { push } from 'connected-react-router';
import store from '../index';
import { setCodeData} from '../store/slices/codeData';

function* fetchSubFormAsync(action){
    const data = action.payload;
    const state = store.getState();
    const send = () => {
        if (state.isSubscribe){
            return sendSubscribe(data.title, data.email)
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
            token: respData.token
        }
        yield put(successedSubForm());
        yield call(store.dispatch,setCodeData(codeData));
        yield call(store.dispatch,push('/code-confirm')); 
    } catch (error) {
        yield put(rejectedSubForm(error.message));
    }
}

function* fetchGetHazardLevels(){
    
}

function* watchSubFormSaga(){
    yield takeLatest('subForm/fetchSubForm', fetchSubFormAsync);
};

export default watchSubFormSaga;