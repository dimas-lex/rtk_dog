
import './styles.css';
import React from 'react';
import { Dog } from '../Dog';

export const DogList = ({ dogs = [], isLoading = false }: { dogs: string[], isLoading: boolean }) => {

  return (
    <div className={`dog-list ${isLoading ? 'dog-list--loading' : ''}`}>
      {
        dogs.map((dog, indx) => (<Dog key={dog} dog={dog} className={`indx-${indx}`} />))
      }
    </div>
  );
}
