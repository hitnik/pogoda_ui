import {createSlice} from '@reduxjs/toolkit';

const init = {
    connect: false,
    error: null,
};

const weatherWSSlice = createSlice({
    name: 'weatherSocket',
    initialState: init,
    reducers:{
        onConnect: (state, action) =>{
            state.connect = true;
            console.log('connected')
        }

    }
});

export const { onConnect
  } = weatherWSSlice.actions;

export default weatherWSSlice.reducer