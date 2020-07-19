import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useHistory } from 'react-router-dom'
import errorMessages from '../initialConstants/errorMessages';
import { sendSubscribe } from '../../actions/subscribeActions/api';

const subscribeThunk = createAsyncThunk(
    'subForm/subscribe', 
    async (arg=null, thunkAPI) =>{
        const state = thunkAPI.getState();
        return await sendSubscribe(state.subForm.title.value, state.subForm.email.value)
        .then(response =>{
            console.log('in responce');
            if(!response.ok) throw new Error(resonse.statusText);
            return response.json();
        })
        .then(json =>{json});
    }
)

const subFormSlice = createSlice({
    name: 'subForm',
    initialState: {
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
        data:[]
    },
    reducers:{
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
            console.log('rejected');
            console.log(action.error.message);
        },
        [subscribeThunk.fulfilled]: (state, action) => {
            state.loading = "idle";
            state.responseError = null;
            state.data = action.payload;
            
          } 
    }
});




export const { setSubFormEmail, setSubFormTitle,
               clearSubFormEmailError, clearSubFormTitleError,
               setSubFormTitleErrorRequired, setSubFormEmailErrorFormat,
               setSubFormEmailErrorRequired,
               sendSubscribeRequest
             } = subFormSlice.actions ;

export {subscribeThunk}

export default subFormSlice.reducer;