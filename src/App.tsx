
import './App.css';
import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { fetchRandom, fetchRandomBreed, resetList, removeError } from './features/dog/dogSlice';
import { RootState } from './app/store';
import { DogList } from './components/DogList';
import { Loader } from './components/Loader';
import { ErrorBox } from './components/ErrorBox';



export const App = () => {
  const dogs = useAppSelector((state: RootState) => state.dogs.entities);
  const isLoading = useAppSelector((state: RootState) => state.dogs.isLoading);
  const errorMessage = useAppSelector((state: RootState) => state.dogs.errorMessage);
  const dispatch = useAppDispatch();

  const onLoadRandom = () => dispatch(fetchRandom());
  const onLoadRandomCorgi = () => dispatch(fetchRandomBreed('pembroke'));
  const onGetError = () => dispatch(fetchRandomBreed('something'));
  const onReset = () => dispatch(resetList());

  useEffect(() => {
    dispatch(fetchRandom())
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(removeError());
    }, 9000);
  }, [errorMessage, dispatch]);

  return (
    <div className="App">
      <header className="App-header"> 
        <ErrorBox error={errorMessage} />
        DOGS
      </header>
      <main className="App-main">
        <div className="App-toolbar">
          <button className="App-btn" onClick={onLoadRandom}>Get New</button>
          <button className="App-btn" onClick={onLoadRandomCorgi}>Get Corgi</button>
          <button className="App-btn" onClick={onGetError}>Get Error</button>
          <button className="App-btn" onClick={onReset}>Reset</button>
        </div>
        {isLoading && <Loader isLoading={isLoading} />}
        <DogList dogs={dogs} isLoading={isLoading} />
      </main>
    </div>
  );
}
