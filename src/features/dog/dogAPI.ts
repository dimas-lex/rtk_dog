const parseResponse  = (data: any) => { 
  if (data.status === 'error') throw new Error('Something went wrong')
  return {
    data: data.message
  }
};

export const dogAPI = {  
  fetchRandom: async () => {
    return fetch( 'https://dog.ceo/api/breeds/image/random')
      .then((response: any) => response.json())
      .then(parseResponse);
  },

  fetchRandomBreed: async (breed: string) => {
    return fetch(`https://dog.ceo/api/brseed/${breed}/images/random`)
      .then((response: any) => response.json())
      .then(parseResponse);
  } 
};