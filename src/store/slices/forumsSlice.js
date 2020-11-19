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
        setForumsMenuActiveIndex: (state, action)=>{
            const index = action.payload;
            state.forumsMenuActiveIndex = index;
        },
        setSitesMenuActiveIndex: (state, action)=>{
            const index = action.payload;
            state.siteMenuActiveIndex = index;
            
        },
        setDate: (state, action) =>{
            const date = action.payload;
            state.date = date;
        },
        requestedSiteData: (state) =>{
            if (state.siteData.loading === false ) {
                state.siteData.loading = true;
              }
              state.error = null;
              state.siteMenuActiveIndex = null;  
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
        requestedForums: (state) =>{
            state.error = null;
            state.forumsMenuActiveIndex = null;
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
    fetchForums, succesedForums , fetchTopics, succesedTopics,
    setForumsMenuActiveIndex, setSitesMenuActiveIndex,
    setDate, setDateError, requestedForums,
  } = forumsSlice.actions ;

export default forumsSlice.reducer;