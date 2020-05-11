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
       await fetch(this._schema, {
                method: 'GET',
                mode: 'no-cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/vnd.oai.openapi'
                  },
        }
        ).then(function(response) {
            return response.text().then(function(text) {
             console.log(text);
            })}

        );
       
    }
}

// export default function requestSubscribe(title, email){
//     console.log(title+'  '+email);
//     console.log(PRODUCTION);
// } 
