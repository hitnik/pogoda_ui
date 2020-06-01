import React, { PureComponent} from "react";
import SwaggerClient from 'swagger-client';



export default class WeatherAPIConnector {
    #host
    #schemaURL
    #spec
    #apis = {
        subscribe: 'newsletter_subscribe',
        unsubscribe: 'newsletter_unsubscribe',
        activate: 'activate_subscribe',
        deactivate: 'deactivate_subscribe'
    }



    constructor () {
        if (!PRODUCTION){
            this.#host = WEATHER_API_HOST_DEV;
            this.#schemaURL = this.#host + WEATHER_API_SCHEMA_DEV;
        }
        else {
            this.#host = WEATHER_API_PROD;
            this.#schemaURL = this.#host+ WEATHER_API_SCHEMA_PROD;   
        }
        
        
        this.#spec = { 
            url: this.#schemaURL,
            disableInterfaces: false,
          }  

       
    }

    sendSubscribe = (title, email) =>{
        SwaggerClient(this.#spec)
            .then((client) => {
              client.apis.default.newsletter_subscribe()
            })
            // .catch((err) =>{
            //  alert(err);
            // })
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