import {createSlice} from '@reduxjs/toolkit';

const init = {
    dataRaw: {},
    warningsArr : [],
    next: null,   
    loading: false,
    responseError: false,
    errorMessage:'',
};


const warningsSlice = createSlice({
  name: 'warnings',
  initialState: init,
  reducers:{
    setPageSize: (state, action) =>{
      const pageSize = action.payload;
      state.pageSize = pageSize;
    }, 
    requestedWarnings:(state) =>{
      state.dataRaw = {};
      state.warningsArr = [];
      state.next = null;
      state.loading = true;
      state.responseError = false;
      state.errorMessage = '';
    },
    successedWarnings:(state, action) =>{
      const data = action.payload;
      state.dataRaw = data;
      state.next = data.next;
      state.warningsArr = [];
      state.loading = false;
      state.responseError = false;
      state.errorMessage = '';
    },
    updateWarningsArr: (state, action) => {
      const item = action.payload;
      state.warningsArr.push(item);
    },
    clearWarningsArr:(state) => {
      state.warningsArr = [] ;
    },
    rejectedWarnings: (state, action) => {
      const err = action.payload;
      state.dataRaw = {};
      state.warningsArr = [];
      state.next = null;
      state.loading = false;
      state.responseError = true;
      state.errorMessage = err;
    },
    fetchWarnings: () => {},
    requestedWarningsNext:(state) =>{
      state.dataRaw = {};
      state.next = null;
      state.loading = false;
      state.responseError = false;
      state.errorMessage = '';
    },
    successedWarningsNext:(state, action) =>{
      const data = action.payload;
      state.dataRaw = data;
      state.next = data.next;
      state.loading = false;
      state.responseError = false;
      state.errorMessage = '';
    },
    fetchWarningsNext: () => {},
  }

});
    
export const {requestedWarnings, successedWarnings,
              rejectedWarnings, fetchWarnings,
              updateWarningsArr, setPageSize,
              requestedWarningsNext, successedWarningsNext,
              fetchWarningsNext, clearWarningsArr
            } = warningsSlice.actions;

export default warningsSlice.reducer