import { createReducer } from "@reduxjs/toolkit"

import initialState from '../initialState';
import { setSubFormEmail, setSubFormTitle } from '../actionCreators';

const subForm = createReducer(initialState.subForm, {
    [setSubFormEmail]: (state, action) => {
        const value = action.payload;
        state.email=value;
    },
    [setSubFormTitle]: (state, action) => {
        const value = action.payload;
        state.title=value;
    },
})

export default subForm;