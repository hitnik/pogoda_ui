import { createSlice} from '@reduxjs/toolkit';

const init = {
    url: '',
    loading: false,
    error: false,
  };

const dogSlice = createSlice({
    name: 'dog',
    initialState: init, 
    reducers:{
      requestedDog: (state) => {
        state.url ='';
        state.loading = true;
        state.error = false;
      },
      requestedDogSuccess: (state, action) =>{
        const url = action.payload.message;
        state.url =url;
        state.loading = false;
        state.error = false;
      },
      requestedDogFailed: (state) => {
        state.url ='';
        state.loading = false;
        state.error = true;
      },
      fetchDog: () => {}
    }
});


export const {  requestedDogSuccess, requestedDog, 
                requestedDogFailed, fetchDog
              } = dogSlice.actions

export default dogSlice.reducer