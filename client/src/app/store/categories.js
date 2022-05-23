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
    },
    editCategoryReceved: (state, action) => {
      const editIndex = state.entities.findIndex(e => e._id === action.payload._id);
      state.entities[editIndex] = action.payload;
      state.isLoading = false;
    },
    createCategoryReceved: (state, action) => {
      state.entities.push(action.payload);
      state.isLoading = false;
    }
  }
});

const { actions, reducer: categoriesReducer } = categoriesSlice;
const {
  categoriesReceved,
  categoriesRequested,
  categoriesRequestedFiled,
  setDateLoad,
  editCategoryReceved,
  createCategoryReceved
} = actions;

// 'диспатчеры'
export const loadCategoriesList = () => async (dispatch, getState) => {
  const loadedDate = getState().categories.dateLoad;
  if (Date.now() < (loadedDate + 1000 * 60)) return;
  dispatch(categoriesRequested());
  try {
    const { data } = await categoriesService.get();
    dispatch(categoriesReceved(data));
    dispatch(setDateLoad(Date.now()));
  } catch (error) {
    dispatch(categoriesRequestedFiled(error));
  }
};

export const updatedCategory = (categoryData) => async (dispatch) => {
  dispatch(categoriesRequested());
  try {
    const { data } = await categoriesService.edit(categoryData);
    dispatch(editCategoryReceved(data));
  } catch (error) {
    dispatch(categoriesRequestedFiled(error));
  }
};

export const createCategory = (categoryData) => async (dispatch) => {
  try {
    const { data } = await categoriesService.create(categoryData);
    dispatch(createCategoryReceved(data));
  } catch (error) {
    dispatch(categoriesRequestedFiled(error));
  }
};

// 'Селекторы'
export const getCategories = () => (state) => state.categories.entities;
export const getCategoryNameById = (_id) => (state) => state.categories.entities.filter(c => c._id === _id)[0]?.name;

export default categoriesReducer;
