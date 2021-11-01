import { parseResponse } from "../../utils";

export const dogAPI = {
  fetchRandom: async () => {
    return fetch( 'https://dog.ceo/api/breeds/image/random')
      .then((response: any) => response.json())
      .then(parseResponse);
  },

  fetchRandomBreed: async (breed: string) => {
    return fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
      .then((response: any) => response.json())
      .then(parseResponse);
  }
};