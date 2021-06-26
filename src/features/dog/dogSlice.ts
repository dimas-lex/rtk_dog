import { createAsyncThunk, createAction, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { dogAPI } from './dogAPI';

interface IDogState {
  entities: any[],
  isLoading: boolean,
  errorMessage?: string | null;
};

const initialState: IDogState = {
  entities: [],
  isLoading: false,
  errorMessage: null,
};

export const fetchRandomBreed = createAsyncThunk(
  'dog/fetchRandom',
  async (breed: string, thunkAPI) => {
    try {
      const response = await dogAPI.fetchRandomBreed(breed);
      return response.data;

    } catch (err: any) {
      return thunkAPI.rejectWithValue(err?.message);
    }
  }
);

export const fetchRandom = createAsyncThunk(
  'dog/fetchRandom',
  async (_, thunkAPI) => {
    try {
      const response = await dogAPI.fetchRandom();
      return response.data;

    } catch (err: any) {
      return thunkAPI.rejectWithValue(err?.message);
    }
  }
);

export const resetList = createAction('dog/deleteAll');
export const removeError = createAction('dog/removeError');


export const dogSlice = createSlice({
  name: 'dog',
  initialState: initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetList, (state: IDogState) => {
        state.entities = [];
      })
      .addCase(removeError, (state: IDogState) => {
        state.errorMessage = null;
      })

      .addMatcher(
        isAnyOf(fetchRandom.pending, fetchRandomBreed.pending),
        (state: IDogState) => {
          state.isLoading = true;
          state.errorMessage = null;
        })
      .addMatcher(
        isAnyOf(fetchRandom.rejected, fetchRandomBreed.rejected),
        (state: IDogState, action) => {
          state.isLoading = false;
          state.errorMessage = action?.payload as string;
        })
      .addMatcher(
        isAnyOf(fetchRandom.fulfilled, fetchRandomBreed.fulfilled),
        (state: IDogState, action) => {
          state.entities.unshift(action.payload);
          state.isLoading = false;
          state.errorMessage = null;
        })

  }
});

export const selectDogsCount = (state: RootState) => state.dogs.entities.length
export const selectDogs = (state: RootState) => state.dogs.entities.length

export const dogReducer = dogSlice.reducer;