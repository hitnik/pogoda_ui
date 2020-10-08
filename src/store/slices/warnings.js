import { createSlice} from '@reduxjs/toolkit';


const init = {
    data: {},
    loading: false,
    responseError: null,
    errorMessage:''
};

const warningsSlice = createSlice({
    name: 'codeData',
    initialState:init,
    reducers:{},
    extraReducers:{
        requestedWarnings:(state, action) => {
            state.loading = true;
            state.responseError = false;
            state.errorMessage = '';
        },
        requestedWarningsSuccess:(state, action) => {
            state.loading = false;
            state.responseError = false;
            state.errorMessage = '';
            state.data = action.data;
        },
        fetchWarnings: (state, action)
    }
})

export const {  requestedWarnings, requestedWarningsSuccess,
                fetchWarnings,
                } = warningsSlice.actions ;


export default warningsSlice.reducer;