import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { breedAPi } from './breedAPI';

interface IBreedsState {
  breeds: string[],
  selectedBreed: string | null,
  isLoading: boolean,
  errorMessage?: string | null;
};

const initialState: IBreedsState = {
  breeds: [],
  selectedBreed: null,
  isLoading: false,
  errorMessage: null,
};

export const fetchBreed = createAsyncThunk(
  'breed/fetchBreed',
  async (_, thunkAPI) => {
    try {
      const response = await breedAPi.fetchBreeds();
      return response.data;

    } catch (err: any) {
      return thunkAPI.rejectWithValue(err?.message);
    }
  }
);

export const breedSelected = createAction<string | null>('breed/breedSelected');



export const breedSlice = createSlice({
  name: 'dog',
  initialState: initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBreed.pending, (state: IBreedsState) => {
        state.breeds = [];
        state.isLoading = false;
        state.errorMessage = null;
      })
      .addCase(fetchBreed.rejected, (state: IBreedsState, action) => {
        state.breeds = [];
        state.isLoading = false;
        state.errorMessage = action?.payload as string;
      })
      .addCase(fetchBreed.fulfilled, (state: IBreedsState, action) => {
        state.breeds = Object.keys(action.payload);
        state.selectedBreed = state.breeds[0];
        state.isLoading = false;
        state.errorMessage = null;
      })
      .addCase(breedSelected, (state: IBreedsState, action) => {
        state.selectedBreed = action.payload;
      })
  }
});

export const selectBreeds = (state: RootState) => state.breeds.breeds;
export const selectSelectedBreed = (state: RootState) => state.breeds.selectedBreed;

export const breedReducer = breedSlice.reducer;