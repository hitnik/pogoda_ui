import { createSlice } from '@reduxjs/toolkit';
import calculateTimeLeft, { caculateTimeLeft } from '../../actions/timer'

const init = {
    title: '',
    email: '',
    dateExpires: null,
    confirmURL: null,
    timeLeft: {}
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
        },
        setTimeLeft : (state, action) =>{
            const value = action.payload;
            state.timeLeft = value;
        }

    }
});

export const { setCodeDataInitial, setCodeData,
    setTimeLeft
} = codeData.actions ;


export default codeData.reducer;