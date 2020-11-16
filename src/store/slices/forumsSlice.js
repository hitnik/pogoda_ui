import { createSlice } from '@reduxjs/toolkit';
import {yesterday} from '../../utils';

const init = {
    date: yesterday(),
    siteMenuActiveIndex: null,
    siteData : {
        data : [],
        loading : false,
    },
    error : null
}

const forumsSlice = createSlice({
    name: 'forums',
    initialState: init, 
    reducers:{
        requestedSiteData: (state) =>{
            const date = yesterday();
            state.date = date;
            if (state.siteData.loading === false ) {
                state.siteData.loading = true;
              }
              state.error = null;  
        },
        rejectedSiteData: (state, action) => {
            state.siteData.loading = false;
            const err = action.payload;
            state.error = err;
        },
        successedSiteData: (state, action) => {
            state.siteData.loading = false;
            state.error = null;
            const data = action.payload;
            for (let i = 0; i < data.length; i++) {
                if (data[i].count > 0){
                    state.siteMenuActiveIndex = i;
                    break;
                }
                
            };
            state.siteData.data = data;
          },
        succesedSitesCount: (state, action) => {
            state.error = null;
            // const data = action.payload;
            // for (let i = 0; i < data.length; i++) {
            //     if (data[i].count > 0){
            //         state.siteMenuActiveIndex = i;
            //         break;
            //     }
                
            // };
        },
        fetchSiteData: () =>{},
        fetchSitesCount: () => {},
    }
});


export const { 
    requestedSiteData, rejectedSiteData, successedSiteData, 
    fetchSiteData, succesedSitesCount, fetchSitesCount
  } = forumsSlice.actions ;

export default forumsSlice.reducer;