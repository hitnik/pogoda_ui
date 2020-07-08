import { createReducer } from "@reduxjs/toolkit"

import initialState from '../initialState';
import { subscribe, unsubscribe } from '../actionCreators';


const isSubscribe = createReducer(initialState.isSubscribe, {
    [subscribe]: state => true,
    [unsubscribe]: state => false
})


export default isSubscribe;