import {get} from '../weatherActions/api';

const host = PRODUCTION ?  WEATHER_API_HOST_PROD : WEATHER_API_HOST_DEV;

const apis = {
    sites: 'forums/v1/sites/',
}

const getSites = async (date) =>{
    const apiURL = new URL(apis.sites, host);
    apiURL.searchParams.append('date', date)
    return await get(apiURL)
} 

const getSitesCount = async (url) => {
    return await get(url);
}

export {getSites, getSitesCount};