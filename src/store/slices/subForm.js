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
    isEdit: false, 
    loading: 'idle',
    responseError: null,
    loadingLevels : false,
    levelsError: null,
    hazardLevels: [],
    hazardLevelsMarked:[],
    loadingGetUser: false,
    errorGetUser: null,
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
        setMarkedLevels:(state, action) => {
           const arr = action.payload;
           state.hazardLevelsMarked = arr; 
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
            if (state.loadingLevels === false) {
                state.loadingLevels = true;
              }
              state.levelsError = null;  
        },
        rejectedHazardLevels: (state, action) => {
            state.loadingLevels = false;
            const err = action.payload
            state.levelsError = err;
        },
        successedHazardLevels: (state, action) => {
            state.loadingLevels = false;
            state.levelsError = null;  
            let levels = action.payload;
            levels.sort(function (a, b) {
                if (a.id > b.id) {
                  return 1;
                }
                if (a.id < b.id) {
                  return -1;
                }
                return 0;
              })
            state.hazardLevels = levels; 
        },
        requestedGetUser: (state) =>{
            state.loadingGetUser = true;
            state.errorGetUser = null;
            state.isEdit = false;
        },
        rejectedGetUser: (state, action) =>{
            state.loadingGetUser = false;
            state.isEdit = false;
            const err = action.payload;
            state.errorGetUser = err;
        },
        successedGetUser: (state, action) =>{
            state.loadingGetUser = false;
            state.errorGetUser = null;
            state.isEdit = true;
            const data = action.payload;
            state.title.value = data.title;
            state.email.value = data.email;
            state.hazardLevelsMarked = data.hazard_levels;
        },
        fetchSubForm: () =>{},
        fetchHazardLevels: () =>{},
        fetchGetUser: () => {},
    }
});




export const { setSubFormEmail, setSubFormTitle,
               clearSubFormEmailError, clearSubFormTitleError,
               setSubFormTitleErrorRequired, setSubFormEmailErrorFormat,
               setSubFormEmailErrorRequired,
               sendSubscribeRequest, setSubFormInitial,
               requestedSubForm, rejectedSubForm, successedSubForm,
               fetchSubForm, requestedHazardLevels, rejectedHazardLevels,
               successedHazardLevels, fetchHazardLevels, setMarkedLevels,
               requestedGetUser, rejectedGetUser, successedGetUser,
               fetchGetUser,
             } = subFormSlice.actions ;

export default subFormSlice.reducer;