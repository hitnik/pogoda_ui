import { createSlice } from '@reduxjs/toolkit';
import {yesterday} from '../../utils';
import {compareForumsData} from '../../utils';
const init = {
    date: yesterday(),
    siteMenuActiveIndex: null,
    forumsMenuActiveIndex: null,
    siteData : {
        data : [],
        loading : false,
    },
    error : null,
    forums : [],
    topics: [],
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
            state.siteData.data = data;
          },
        succesedSitesCount: (state, action) => {
            state.error = null;
            const data = action.payload;
            state.siteData.data = data;
            for (let i = 0; i < data.length; i++) {
                if (data[i].count > 0){
                    state.siteMenuActiveIndex = i;
                    break;
                }   
            };
        },
        succesedForums: (state, action) => {
            state.error = null;
            let data = action.payload;
            data = data.sort(compareForumsData);
            state.forums = data;
            for (let i = 0; i < data.length; i++) {
                if (data[i].count > 0){
                    state.forumsMenuActiveIndex = i;
                    break;
                }   
            
            };
        },
        succesedTopics: (state, action) =>{
            state.error = null;
            const data = action.payload;
            state.topics = data;
        },
        fetchSiteData: () =>{},
        fetchSitesCount: () => {},
        fetchForums: () => {},
        fetchTopics: () =>{},
    }
});


export const { 
    requestedSiteData, rejectedSiteData, successedSiteData, 
    fetchSiteData, succesedSitesCount, fetchSitesCount,
    fetchForums, succesedForums , fetchTopics, succesedTopics
  } = forumsSlice.actions ;

export default forumsSlice.reducer;