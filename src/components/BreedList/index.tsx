
import './styles.css';
import React from 'react';
import Select from 'react-select'


export const BreedList = ({ breeds = [], selectedBreed = '', isLoading = false, onChange }:
  {
    breeds: string[];
    selectedBreed: string | null;
    isLoading: boolean;
    onChange: (val: string | null) => void;
  }) => {
  if (isLoading) {
    return (
      <div>Loading</div>
    )
  }

  const breedOptions = breeds.map((br) => ({ value: br, label: br }));
  const onBreedSelected = (newValue: { value: string | null; label: string | null; } | null) => {
    onChange(newValue ? newValue.value : null);
  }


  return (
    <Select
      className="breed-list"
      options={breedOptions}
      value={{ value: selectedBreed, label: selectedBreed }}
      onChange={onBreedSelected}
    />
  );
}
