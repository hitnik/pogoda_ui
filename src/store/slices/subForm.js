import { createSlice } from '@reduxjs/toolkit';

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
        }
    },
    reducers:{
        setSubFormEmail: (state, action) => {
            const value = action.payload;
            state.email.value=value;
        },
        setSubFormTitle: (state, action) => {
            const value = action.payload;
            console.log('sgsdfsdf')
            console.log('errors '+state.errors);
            state.title.value=value;
        },
        clearSubFormEmailError:(state) => {state.email.error = false},
        clearSubFormTitleError:(state) => {state.title.error = false}
    }

});

export const { setSubFormEmail, setSubFormTitle,
               clearSubFormEmailError, clearSubFormTitleError 
             } = subFormSlice.actions ;

export default subFormSlice.reducer;