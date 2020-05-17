import React, { PureComponent} from "react";
import SwaggerClient from 'swagger-client';

export default class WeatherAPIConnector {
    _host
    _schemaURL
    _swagger



    constructor () {
        if (!PRODUCTION){
            this._host = WEATHER_API_HOST_DEV;
            this._schemaURL = this._host + WEATHER_API_SCHEMA_DEV;
        }
        else {
            this._host = WEATHER_API_PROD;
            this._schemaURL = this._host+ WEATHER_API_SCHEMA_PROD;   
        }
       
        this._get_schema()
        console.log(this._swagger);
        if (this._swagger != undefined){
            console.log(this._swagger);
        }

    }

    _get_schema = async () => {
        await new SwaggerClient({ 
                url: this._schemaURL,
                disableInterfaces: false,
              }).then(
                result => {this._swagger
                }, error => {alert('Error: '+error)}
            )    
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
