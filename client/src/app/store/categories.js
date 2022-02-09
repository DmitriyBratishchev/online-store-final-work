import { createSlice } from '@reduxjs/toolkit';
import categoriesService from '../services/categories.service';

const initialState = {
  entities: [],
  isLoading: true,
  error: null
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    categoriesRequested: (state) => {
      state.isLoading = true;
    },
    categoriesReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    categoriesRequestedFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { actions, reducer: categoriesReducer } = categoriesSlice;
const { categoriesReceved, categoriesRequested, categoriesRequestedFiled } = actions;

// 'диспатчеры'
export const loadCategoriesList = () => async (dispatch) => {
  dispatch(categoriesRequested());
  try {
    const content = await categoriesService.get();
    console.log('content', content);
    dispatch(categoriesReceved(content));
  } catch (error) {
    console.log('error', error);
    dispatch(categoriesRequestedFiled(error));
  }
};

// 'Селекторы'
export const getCategories = () => (state) => state.categories.entities;
export const getCategoryNameById = (id) => (state) => state.categories.entities.filter(c => c.id === id)[0]?.name;

export default categoriesReducer;
