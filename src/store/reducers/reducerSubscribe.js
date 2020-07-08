import { createReducer } from "@reduxjs/toolkit"

import initialState from '../initialState';
import { subscribe, unsubscribe } from '../actionCreaters';


const isSubscribe = createReducer(initialState, {
    [subscribe]: (state, action) => true,
    [unsubscribe]: (state, action) => false
})


export default isSubscribe;