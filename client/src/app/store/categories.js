import { createSlice } from '@reduxjs/toolkit';
import categoriesService from '../services/categories.service';

const initialState = {
  entities: [],
  isLoading: true,
  dateLoad: 0,
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
    },
    setDateLoad: (state, action) => {
      state.dateLoad = action.payload;
    }
  }
});

const { actions, reducer: categoriesReducer } = categoriesSlice;
const { categoriesReceved, categoriesRequested, categoriesRequestedFiled, setDateLoad } = actions;

// 'диспатчеры'
export const loadCategoriesList = () => async (dispatch, getState) => {
  const loadedDate = getState().categories.dateLoad;
  console.log('content', loadedDate, Date.now());
  if (Date.now() < (loadedDate + 1000 * 60)) return;
  dispatch(categoriesRequested());
  try {
    const content = await categoriesService.get();
    dispatch(categoriesReceved(content));
    dispatch(setDateLoad(Date.now()));
  } catch (error) {
    console.log('error', error);
    dispatch(categoriesRequestedFiled(error));
  }
};

// 'Селекторы'
export const getCategories = () => (state) => state.categories.entities;
export const getCategoryNameById = (_id) => (state) => state.categories.entities.filter(c => c._id === _id)[0]?.name;

export default categoriesReducer;
