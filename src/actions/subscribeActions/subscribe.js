import React, { PureComponent} from "react";
import SwaggerClient from 'swagger-client';

export default class WeatherAPIConnector {
    #host
    #schemaURL
    #swagger



    constructor () {
        if (!PRODUCTION){
            this.#host = WEATHER_API_HOST_DEV;
            this.#schemaURL = this.#host + WEATHER_API_SCHEMA_DEV;
        }
        else {
            this.#host = WEATHER_API_PROD;
            this.#schemaURL = this.#host+ WEATHER_API_SCHEMA_PROD;   
        }
       
        
        const pr = new SwaggerClient({ 
            url: this.#schemaURL,
            disableInterfaces: false,
          }).then(client => this.#swagger=client)
          .catch(error => alert(error));
        
        console.log(this.#swagger)
        if (this.#swagger != undefined){
            console.log(this.#swagger);
        }else{'error is occured'}

    }

    #get_schema = () => {
        return new SwaggerClient({ 
                url: this.#schemaURL,
                disableInterfaces: false,
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