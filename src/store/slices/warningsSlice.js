import {createSlice} from '@reduxjs/toolkit';

const init = {
    data: {},
    loading: false,
    responseError: false,
    errorMessage:''
};


const warningsSlice = createSlice({
  name: 'warnings',
  initialState: init,
  reducers:{
    requestedWarnings:(state) =>{
      state.data = {};
      state.loading = true;
      state.responseError = false;
      state.errorMessage = '';
    },
    succesedWarnings:(state, action) =>{
      const data = action.payload;
      state.data = {};
      state.loading = true;
      state.responseError = false;
      state.errorMessage = '';
    },
    rejectedWarnings: (state, action) => {
      const err = action.error.message;
      state.data = {};
      state.loading = false;
      state.responseError = true;
      state.errorMessage = err;
    },
    fetchWarnings: () => {}
  }

});
    
export const {requestedWarnings, succesedWarnings,
              rejectedWarnings, fetchWarnings
            } = warningsSlice.actions;

export default warningsSlice.reducer