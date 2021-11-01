
import './App.css';
import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { fetchRandom, fetchRandomBreed, resetList, selectDogs } from './features/dog/dogSlice';
import { RootState } from './app/store';
import { BreedList } from './components/BreedList';
import { DogList } from './components/DogList';
import { Loader } from './components/Loader';
import { ErrorBox } from './components/ErrorBox';
import { breedSelected, fetchBreed, selectBreeds, selectSelectedBreed } from './features/breed/breedSlice';


export const App = () => {
  const dogs = useAppSelector(selectDogs);
  const breeds = useAppSelector(selectBreeds);
  const selectedBreed = useAppSelector(selectSelectedBreed);

  const isLoadingDog = useAppSelector((state: RootState) => state.dogs.isLoading);
  const errorMessage = useAppSelector((state: RootState) => state.dogs.errorMessage);
  const isLoadingBreed = useAppSelector((state: RootState) => state.breeds.isLoading);

  const dispatch = useAppDispatch();

  const onLoadRandom = () => dispatch(fetchRandom());
  const loadSelectedDogByBreed = () => dispatch(fetchRandomBreed(selectedBreed));
  const onGetError = () => dispatch(fetchRandomBreed(selectedBreed));
  const onReset = () => dispatch(resetList());
  const onBreedSelected = (breed: string | null) => dispatch(breedSelected(breed));

  useEffect(() => {
    dispatch(fetchRandom());
    dispatch(fetchBreed());
  }, [dispatch]);

  return (
    <div className="app">
      <header className="app__header">
        <ErrorBox error={errorMessage} />
        DOGS
      </header>
      <main className="app__main">
        <div className="app__toolbar">
          <BreedList isLoading={isLoadingBreed} breeds={breeds} selectedBreed={selectedBreed} onChange={onBreedSelected} />

          <button className="app__btn cy-get-new" onClick={onLoadRandom}>Get Random Dog</button>
          <button className="app__btn cy-get-corgi" onClick={loadSelectedDogByBreed}>Get Dog By Breed</button>
          <button className="app__btn cy-get-error" onClick={onGetError}>Get Error</button>
          <button className="app__btn cy-get-reset" onClick={onReset}>Reset</button>
        </div>
        {isLoadingDog && <Loader isLoading={isLoadingDog} />}
        <DogList dogs={dogs} isLoading={isLoadingDog} />
      </main>
    </div>
  );
}
