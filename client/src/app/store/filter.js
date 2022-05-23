import { createSlice } from '@reduxjs/toolkit';
import categoriesService from '../services/categories.service';

const initialState = {
  entities: {
    categories: [],
    price: {
      min: 0,
      max: 0,
      interval: [0, 0]
    }
  },
  isLoading: true,
  dateLoad: 0,
  error: null
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    categoriesRequested: (state) => {
      state.isLoading = true;
    },
    filterCategoriesReceved: (state, action) => {
      state.entities.categories = action.payload;
      state.isLoading = false;
    },
    filterPriceMinMaxReceved: (state, action) => {
      state.entities.price.min = action.payload[0];
      state.entities.price.max = action.payload[1];
      if (state.entities.price.interval[1] === 0) {
        state.entities.price.interval = action.payload;
      }
    },
    filterPriceEditReceved: (state, action) => {
      state.entities.price.interval = action.payload;
      state.isLoading = false;
    },
    categoriesRequestedFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { actions, reducer: filterReducer } = filterSlice;
const { filterCategoriesReceved, filterPriceMinMaxReceved, filterPriceEditReceved, categoriesRequestedFiled } = actions;

// 'диспатчеры'
export const loadFiltersList = () => async (dispatch, getState) => {
  const categoriesInState = getState().filter.entities.categories;
  try {
    const { data: categories } = await categoriesService.get();
    const categoriesFilter = categories.map(category => {
      const indexInState = categoriesInState.findIndex(catInState => catInState._id === category._id);
      if (indexInState !== -1) {
        return categoriesInState[indexInState];
      } else {
        return { ...category, checked: true };
      }
    });
    dispatch(filterCategoriesReceved(categoriesFilter));
  } catch (error) {
    dispatch(categoriesRequestedFiled(error));
  }
};

export const loadPriceFilterInterval = (catalog) => (dispatch) => {
  let minPrice = catalog.reduce((acc, product) => product.price < acc ? product.price : acc, Infinity);
  minPrice = minPrice === Infinity ? 0 : minPrice;
  const maxPrice = catalog.reduce((acc, product) => product.price > acc ? product.price : acc, 0);
  dispatch(filterPriceMinMaxReceved([minPrice, maxPrice]));
};

export const editCategoryFilter = (id) => (dispatch, getState) => {
  const categoriesInState = getState().filter.entities.categories;
  const editCategory = categoriesInState.map(cat => cat._id === id ? { ...cat, checked: !cat.checked } : cat);
  dispatch(filterCategoriesReceved(editCategory));
};

export const editPriceFilter = (ArrMinMax) => (dispatch) => {
  dispatch(filterPriceEditReceved(ArrMinMax));
};

// 'Селекторы'
export const getFiterCategories = () => (state) => state.filter.entities.categories;
export const getFilterPrice = () => (state) => state.filter.entities.price;

export default filterReducer;
