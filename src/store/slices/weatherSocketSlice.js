import {createSlice} from '@reduxjs/toolkit';


const init = {
    connect: false,
    error: null,
};

const weatherWSSlice = createSlice({
    name: 'weatherSocket',
    initialState: init,
    reducers:{
        wsConnect:() => {},
        wsSend:(state, action) => {
            console.log('send in slice')
            console.log(action.payload)
        },
        onConnect: (state) => {
            state.connect = true;
            state.error = null;
        },
        onError: (state, action) => {
            const err = action.payload;
            state.error = err;
            console.log(err);
        },
        receiveMessage: () =>{},
    }
});

export const { onConnect, wsConnect, onError,
     wsSend, receiveMessage
  } = weatherWSSlice.actions;

export default weatherWSSlice.reducer