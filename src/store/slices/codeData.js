import { createSlice} from '@reduxjs/toolkit';
import calculateTimeLeft from '../../actions/timer';

const init = {
    title: '',
    email: '',
    dateExpires: null,
    confirmURL: null,
    timeLeft: {},
    targetUid: null,
    loading: 'idle',
    responseError: null,
    isSuccess: false,
    successMsg: null,
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
            state.targetUid = value.targetUid;
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
        successedCode: (state, action) => {
            state.loading = "idle";
            const msg = action.payload.message;
            state.isSuccess = true; 
            state.successMsg =msg;
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