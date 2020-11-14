import { createSlice } from '@reduxjs/toolkit';

const init = {
    siteData : {
        data : [],
        loading : false,
        error : null,
    },
}

const forumsSlice = createSlice({
    name: 'forums',
    initialState: init, 
    reducers:{
        requestedSiteData: (state) =>{
            if (state.siteData.loading === false ) {
                state.siteData.loading = true;
              }
              state.siteData.error = null;  
        },
        rejectedSiteData: (state, action) => {
            state.siteData.loading = false;
            const err = action.payload;
            state.siteData.error = err;
        },
        successedSiteData: (state, action) => {
            state.siteData.loading = false;
            status.siteData.error = null;
            const data = action.payload;
            state.siteData.data = data;
          },
        fetchSiteData: () =>{},
    }
});


export const { 
    rejectedSiteData, rejectedSiteData, successedSiteData, 
    fetchSiteData,
  } = forumsSlice.actions ;

export default forumsSlice.reducer;