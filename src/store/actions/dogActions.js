const requestDog = () => {
    return { type: 'REQUESTED_DOG' }
  };
  
  const requestDogSuccess = (data) => {
    return { type: 'REQUESTED_DOG_SUCCEEDED', url: data.message }
  };
  
  const requestDogError = () => {
    return { type: 'REQUESTED_DOG_FAILED' }
  };
  
  const fetchDog = () => {
    return { type: 'FETCHED_DOG' }
  };

export {requestDog, requestDogSuccess, 
        requestDogError, fetchDog
        }