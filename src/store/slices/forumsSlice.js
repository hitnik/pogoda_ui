import { createSlice } from '@reduxjs/toolkit';

const init = {
    date: new Date().toISOString(),
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
            const date = new Date().toISOString()
            state.date = date;
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
            state.siteData.error = null;
            const data = action.payload;
            console.log(data)
            state.siteData.data = data;
          },
        fetchSiteData: () =>{},
    }
});


export const { 
    requestedSiteData, rejectedSiteData, successedSiteData, 
    fetchSiteData,
  } = forumsSlice.actions ;

export default forumsSlice.reducer;