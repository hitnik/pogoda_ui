import {createSlice} from '@reduxjs/toolkit';

const init = {
    dataRaw: {},
    warningsArr : [],
    loading: false,
    responseError: false,
    errorMessage:'',
};


const warningsSlice = createSlice({
  name: 'warnings',
  initialState: init,
  reducers:{
    requestedWarnings:(state) =>{
      state.dataRaw = {};
      state.warningsArr = [];
      state.loading = true;
      state.responseError = false;
      state.errorMessage = '';
    },
    successedWarnings:(state, action) =>{
      const data = action.payload;
      state.dataRaw = data;
      state.warningsArr = [];
      state.loading = false;
      state.responseError = false;
      state.errorMessage = '';
    },
    updateWarningsArr: (state, action) => {
      const item = action.payload;
      state.warningsArr.push(item);
    },
    rejectedWarnings: (state, action) => {
      const err = action.payload;
      state.dataRaw = {};
      state.warningsArr = [];
      state.loading = false;
      state.responseError = true;
      state.errorMessage = err;
    },
    fetchWarnings: () => {}
  }

});
    
export const {requestedWarnings, successedWarnings,
              rejectedWarnings, fetchWarnings,
              setWArningstoFetch, updateWarningsArr,
            } = warningsSlice.actions;

export default warningsSlice.reducer