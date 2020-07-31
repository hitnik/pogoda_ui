const apis = {
        subscribe: 'hazard/v1/subscribe_newsletter',
        unsubscribe: 'hazard/v1/unsubscribe_newsletter',
        activate: 'hazard/v1/code-validate',
    }

const host = !PRODUCTION ? WEATHER_API_HOST_DEV : WEATHER_API_HOST_PROD;

const sendSubscribe = async (title, email) =>{
  const apiURL = new URL(apis.subscribe, host);
  return await fetch(apiURL, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'same-origin', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({title: title, email: email}) // body data type must match "Content-Type" header
    });

}

const sendUnsubscribe = async (email) =>{
  const apiURL = new URL(apis.unsubscribe, host);
  return await fetch(apiURL, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'same-origin', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({email: email}) // body data type must match "Content-Type" header
    });

}

const sendCode = async (code, token, url) => {
  const apiURL = new URL(url, host);
  return await fetch(apiURL, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'same-origin', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({code: code, token:token}) // body data type must match "Content-Type" header
  });
}
  
const responseErrorsHumanize = (error) => {
  switch (error){
    case 'Failed to fetch': 
      return 'Ошибка выполнения запроса(возможно проблема с сетевым соединением)';
    case 'Found':
      return 'Email уже подписан на рассылку';
    case 'Bad Request':
      return 'Ошибка запроса ( отравлены неверные данные)';
    case 'See Other': 
     return 'Этот email не подписан на рассылку';
    default: 
      return error;
  }
}

export {sendSubscribe, sendUnsubscribe, sendCode, responseErrorsHumanize}