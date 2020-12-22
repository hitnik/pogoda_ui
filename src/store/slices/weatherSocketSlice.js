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
            console.log('slice connected')
        }

    }
});

export const { onConnect, wsConnect
  } = weatherWSSlice.actions;

export default weatherWSSlice.reducer