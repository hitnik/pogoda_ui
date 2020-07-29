import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import calculateTimeLeft from '../../actions/timer';
import { sendCode } from '../../actions/subscribeActions/api';
import { setStoreInitial } from '../store';

const activateCode = createAsyncThunk(
    'codeData/activate',
    (data, thunkAPI) =>{
        return sendCode(data.code, data.token, data.url)
        .then(response =>{
            if(!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(json =>{
            return json;
        });
    }
)


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
        clearCodeDataError: state => {state.responseError= null} 
    },
    extraReducers:{
        [activateCode.pending]: (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending';
              }
              state.responseError = null;  
        },
        [activateCode.rejected]: (state, action) => {
            state.loading = "idle";
            state.responseError = action.error.message;
            console.log(action.payload)
        },
        [activateCode.fulfilled]: (state, action) => {
            state.loading = "idle";
            state.isSuccess = true; 
            console.log('success:'+action.payload)
          } 
    }
});

export const { setCodeDataInitial, setCodeData,
    setTimeLeft, clearCodeDataError
} = codeData.actions ;

export { activateCode }

export default codeData.reducer;