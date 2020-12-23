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
        onConnect: (state) =>{
            state.connect = true;
            console.log('slice connected')
        },
        onError: (state , action) => {
            const err = action.payload;
            state.error = err;
            console.log(err);
        },
    }
});

export const { onConnect, wsConnect, onError
  } = weatherWSSlice.actions;

export default weatherWSSlice.reducer