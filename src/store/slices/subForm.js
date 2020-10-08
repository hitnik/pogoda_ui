import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import errorMessages from '../initialConstants/errorMessages';
import { sendSubscribe, sendUnsubscribe } from '../../actions/weatherActions/api';
import { push } from 'connected-react-router';
import store from '../../index';
import { setCodeData} from './codeData';


const subscribeThunk = createAsyncThunk(
    'subForm/subscribe', 
    async (data, thunkAPI) =>{
        const state = thunkAPI.getState();
        const action = () => {
            if (state.isSubscribe){
                return sendSubscribe(data.title, data.email)
            }
            return sendUnsubscribe(data.email)
        }
        return await action()
        .then(response =>{
            if(!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(json =>{
            const codeData = {
                title: data.title,
                email: data.email,
                dateExpires: json.expires,
                confirmURL: json.code_confirm,
                token: json.token
            }
            thunkAPI.dispatch(setCodeData(codeData));
            store.dispatch(push('/code-confirm'));
        });
        
    }
)


const init = {
    title: {
        value: '',
        error: false,
        msg: null
    },
    email: {
        value: '',
        error: false,
        msg: null
    }, 
    loading: 'idle',
    responseError: null,
}

const subFormSlice = createSlice({
    name: 'subForm',
    initialState: init, 
    reducers:{
        setSubFormInitial: state => init,
        setSubFormEmail: (state, action) => {
            const value = action.payload;
            state.email.value=value;
        },
        setSubFormTitle: (state, action) => {
            const value = action.payload;
            state.title.value=value;
        },
        clearSubFormEmailError:(state) => {
            state.email.error = false;
            state.email.msg = null;
        },
        clearSubFormTitleError:(state) => {
            state.title.error = false;
            state.title.msg = null;
        },
        setSubFormTitleErrorRequired: (state) => {
            state.title.error = true;
            state.title.msg = errorMessages.fieldRequired;
        },
        setSubFormEmailErrorRequired: (state) =>{
            state.email.error = true;
            state.email.msg = errorMessages.fieldRequired;
        },
        setSubFormEmailErrorFormat: (state) => {
            state.email.error = true;
            state.email.msg = errorMessages.emailFormat;
        }
    },
    extraReducers: {
        [subscribeThunk.pending]: (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending';
              }
              state.responseError = null;  
        },
        [subscribeThunk.rejected]: (state, action) => {
            state.loading = "idle";
            state.responseError = action.error.message;
        },
        [subscribeThunk.fulfilled]: (state, action) => {
            state.loading = "idle";
            state = init; 
          }
    }
});




export const { setSubFormEmail, setSubFormTitle,
               clearSubFormEmailError, clearSubFormTitleError,
               setSubFormTitleErrorRequired, setSubFormEmailErrorFormat,
               setSubFormEmailErrorRequired,
               sendSubscribeRequest, setSubFormInitial
             } = subFormSlice.actions ;

export {subscribeThunk}

export default subFormSlice.reducer;