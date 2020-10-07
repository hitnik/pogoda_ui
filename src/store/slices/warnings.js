import { createSlice} from '@reduxjs/toolkit';


const init = {
    data: {},
    loading: false,
    responseError: null,
};

const codeData = createSlice({
    name: 'codeData',
    initialState:init,
    reducers:{},
    extraReducers:
})