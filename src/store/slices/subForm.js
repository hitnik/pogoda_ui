import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import errorMessages from '../initialConstants/errorMessages';

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
    loadingLevels : 'idle',
    levelsError: null,
    hazardLevels: []
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
        },
        requestedSubForm: (state) => {
            if (state.loading === 'idle') {
                state.loading = 'pending';
              }
              state.responseError = null;  
        },
        rejectedSubForm: (state, action) => {
            state.loading = "idle";
            const err = action.payload
            state.responseError = err;
        },
        successedSubForm: (state) => {
            state.loading = "idle";
            state = init; 
        },
        requestedHazardLevels: (state) => {
            if (state.loadingLevels === 'idle') {
                state.loadingLevels = 'pending';
              }
              state.levelsError = null;  
        },
        rejectedHazardLevels: (state, action) => {
            state.loadingLevels = "idle";
            const err = action.payload
            state.levelsError = err;
        },
        successedHazardLevels: (state, action) => {
            state.loadingLevels = "idle";
            state.levelsError = null;  
            const levels = action.payload;
            state.hazardLevels = levels; 
        },
        fetchSubForm: () =>{},
        fetchGetHazardLevels: () => {}
    }
});




export const { setSubFormEmail, setSubFormTitle,
               clearSubFormEmailError, clearSubFormTitleError,
               setSubFormTitleErrorRequired, setSubFormEmailErrorFormat,
               setSubFormEmailErrorRequired,
               sendSubscribeRequest, setSubFormInitial,
               requestedSubForm, rejectedSubForm, successedSubForm,
               fetchSubForm
             } = subFormSlice.actions ;

export default subFormSlice.reducer;