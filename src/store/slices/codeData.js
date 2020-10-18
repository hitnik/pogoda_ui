import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import calculateTimeLeft from '../../actions/timer';

const init = {
    title: '',
    email: '',
    dateExpires: null,
    confirmURL: null,
    timeLeft: {},
    token: null,
    loading: 'idle',
    responseError: null,
    isSuccess: false
};

const codeData = createSlice({
    name: 'codeData',
    initialState:init,
    reducers: {
        setCodeDataInitial: state => init,
        setCodeData: (state, action) => {
            const value = action.payload;
            state.title = value.title;
            state.email = value.email;
            state.dateExpires = value.dateExpires;
            state.timeLeft = calculateTimeLeft(value.dateExpires);
            state.confirmURL = value.confirmURL;
            state.token = value.token;
        },
        setTimeLeft : (state, action) =>{
            const value = action.payload;
            state.timeLeft = value;
        },
        clearCodeDataError: state => {state.responseError= null},
        requestedCode: (state) =>{
            if (state.loading === 'idle') {
                state.loading = 'pending';
              }
              state.responseError = null;  
        },
        rejectedCode: (state, action) => {
            state.loading = "idle";
            const err = action.payload;
            state.responseError = err;
        },
        successedCode: (state) => {
            state.loading = "idle";
            state.isSuccess = true; 
          },
        fetchCode: () =>{}
    }
});

export const { setCodeDataInitial, setCodeData,
    setTimeLeft, clearCodeDataError,
    requestedCode, successedCode, rejectedCode,
    fetchCode
} = codeData.actions ;


export default codeData.reducer;