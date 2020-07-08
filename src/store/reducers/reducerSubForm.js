import { createReducer } from "@reduxjs/toolkit"

import initialState from '../initialState';
import { setSubFormEmail, setSubFormTitle } from '../actionCreators';

const subForm = createReducer(initialState.subForm, {
    [setSubFormEmail]: (state, action) => {state.subForm.email='test'},
    [setSubFormTitle]: (state, action) => state.subForm.title=action.payload.title
})

export default subForm;