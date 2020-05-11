import React, { PureComponent} from "react";

export default class WeatherAPIConnector {
    _host
    _schema

    constructor () {
        if (!PRODUCTION){
            this._host = WEATHER_API_HOST_DEV;
            this._schema = this._host + WEATHER_API_SCHEMA_DEV;
        }
        else {
            this._host = WEATHER_API_PROD;
            this._schema = this._host+ WEATHER_API_SCHEMA_PROD;   
        }
        console.log(this._schema)
        const schemaJSON = this._get_schema()

    }

    async _get_schema () {
       let text; 
       const response = await fetch(this._schema, {
                method: 'GET',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/vnd.oai.openapi'
                  },
        }
        );
       if(response.ok){
           text = await response.text();
       }
       else {
           alert('Error while getting cshema');
           return null ;
       }
       console.log(text);

    }
}

// export default function requestSubscribe(title, email){
//     console.log(title+'  '+email);
//     console.log(PRODUCTION);
// } 
