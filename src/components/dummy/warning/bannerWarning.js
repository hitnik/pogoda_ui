import React from "react";
import {Advertisement} from 'semantic-ui-react';
import {WarningComponentLigthWeight} from './warningComponent';

const data = {
    id: 1605361140,
    url: "http://127.0.0.1/hazard/v1/warnings/1605361140/",
    title: "Предупреждение о неблагоприятном явлении",
    external_link: "http://www.pogoda.by/news/?page=35872",
    summary: "Наблюдающиеся местами по республике туманы, в период с 17 до 23 часов 14 ноября (суббота) распространятся на большую часть территории страны и сохранятся в ночные и утренние часы 15 ноября  (воскресенье).Видимость в туманах 100-500 м.\nСегодня 14 ноября (суббота), в период с 17 до 20 часов в Минске ожидается туман при видимости 100-500 м, который сохранится в ночные и утренние часы 15 ноября  (воскресенье).",
    hazard_level: {
        title: "Оранжевый уровень",
        color_code: "FFA500"
    },
    date_start: "2020-11-14",
    date_end: "2020-11-14",
}

const WarningLeftBanner = (props)=>{

    return(     
        <Advertisement centered className="bunner-left" unit='vertical rectangle'>
          <WarningComponentLigthWeight data ={props.data}/>
      </Advertisement>  
 
    )
}

export default WarningLeftBanner;