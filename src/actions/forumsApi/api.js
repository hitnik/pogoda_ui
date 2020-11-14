import {get} from '../weatherActions/api';

const host = PRODUCTION ?  WEATHER_API_HOST_PROD : WEATHER_API_HOST_DEV;

const apis = {
    sites: 'forums/v1/sites/',
}

const getSites = () =>{
    let apiURL = new URL(apis.sites, host);
    return await get(apiURL)
} 

export {getSites};