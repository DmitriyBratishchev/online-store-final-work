import { createSlice } from '@reduxjs/toolkit';
import catalogService from '../services/catalog.service';

const initialState = {
  entities: [],
  isLoading: true,
  error: null
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    favoritesRequested: (state) => {
      state.isLoading = true;
    },
    favoritesReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    favoritesRequestedFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { actions, reducer: favoritesReducer } = favoritesSlice;
const { favoritesReceved, favoritesRequested, favoritesRequestedFiled } = actions;

// 'диспатчеры'
export const loadfavoritesList = () => async (dispatch, getState) => {
  const userFavorites = getState().user.entities.favorites;
  dispatch(favoritesRequested());
  try {
    const content = await Promise.all(userFavorites.map(id => catalogService.getProductById(id))).then(res => res);
    dispatch(favoritesReceved(content));
  } catch (error) {
    dispatch(favoritesRequestedFiled(error));
  }
};

// 'Селекторы'
export const getFavoritesList = () => (state) => state.favorites.entities;
export const getIsLoading = () => (state) => state.favorites.isLoading;

export default favoritesReducer;
