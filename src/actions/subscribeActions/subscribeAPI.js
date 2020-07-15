 import React, { PureComponent} from "react";



export default class WeatherAPIConnector {
    #host
    #apis = {
        subscribe: 'subscribe_newsletter',
        unsubscribe: 'newsletter_unsubscribe',
        activate: 'activate_subscribe',
        deactivate: 'deactivate_subscribe'
    }



    constructor () {
        if (!PRODUCTION){
            this.#host = WEATHER_API_HOST_DEV;
        }
        else {
            this.#host = WEATHER_API_PROD;
        }

    }

    sendSubscribe = async (title, email) =>{
        const apiURL = new URL(this.#apis.subscribe, this.#host);       
        return await fetch(apiURL, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({title: title, email: email}) // body data type must match "Content-Type" header
          })    
    }
}

    //    const response = await fetch(this._schema, {
    //             method: 'GET',
    //             cache: 'no-cache',
    //             headers: {
    //                 'Content-Type': 'application/vnd.oai.openapi'
    //               },
    //     }
    //     );
    //    if(response.ok){
    //        text = await response.text();
    //    }
    //    else {
    //        alert('Error while getting cshema');
    //        return null ;
    //    }
    //    console.log(text);
//         try {
        
//     }
// }



// export default function requestSubscribe(title, email){
//     console.log(title+'  '+email);
//     console.log(PRODUCTION);