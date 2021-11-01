import { parseResponse } from "../../utils";

export const breedAPi = {
  fetchBreeds: async () => {
    return fetch( 'https://dog.ceo/api/breeds/list/all')
      .then((response: any) => response.json())
      .then(parseResponse);
  }
};