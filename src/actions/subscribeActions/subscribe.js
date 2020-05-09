import React, { PureComponent} from "react";

export default class WeatherAPIConnector {
    _host
    _schema

    constructor () {
        if (!PRODUCTION){
            this._host = WEATHER_API_HOST_DEV;
            this._schema = this.host + WEATHER_API_SCHEMA_DEV;
        }
        else {
            this._host = WEATHER_API_PROD;
            this._schema = this.host+ WEATHER_API_SCHEMA_PROD;   
        }
        const schemaJSON = this._get_schema()

    }

    async _get_schema () {
        const responce = await fetch(this._schema);
        console.log(responce.status);
    }
}

// export default function requestSubscribe(title, email){
//     console.log(title+'  '+email);
//     console.log(PRODUCTION);
// } 
