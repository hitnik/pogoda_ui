import { createSlice } from '@reduxjs/toolkit';


const isSubscribeSlice = createSlice({
    name: 'isSubscribe',
    initialState: true,
    reducers:{
        subscribe: state => true,
        unsubscribe: state => false
    }
})

export const { subscribe, unsubscribe } = isSubscribeSlice.actions ;

export default isSubscribeSlice.reducer;