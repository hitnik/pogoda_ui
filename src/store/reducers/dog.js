const initialState = {
    url: 'https://dog.ceo/api/breeds/image/random',
    loading: false,
    error: false,
  };


  const dog = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUESTED_DOG':
      return {
        url: '',
        loading: true,
        error: false,
      };
    case 'REQUESTED_DOG_SUCCEEDED':
      return {
        url: action.url,
        loading: false,
        error: false,
      };
    case 'REQUESTED_DOG_FAILED':
      return {
        url: '',
        loading: false,
        error: true,
      };
    default:
      return state;
  }
        
}

export default dog;