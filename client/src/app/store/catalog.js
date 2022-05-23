import { createSlice } from '@reduxjs/toolkit';
import catalogService from '../services/catalog.service';

const initialState = {
  entities: [],
  isLoading: true,
  error: null
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    catalogRequested: (state) => {
      state.isLoading = true;
    },
    catalogReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    catalogRequestedFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    addCatalogElement: (state, action) => {
      state.entities.push(action.payload);
      state.isLoading = false;
    },
    editCatalogElement: (state, action) => {
      const editIndex = state.entities.findIndex(e => e._id === action.payload._id);
      state.entities[editIndex] = action.payload;
    },
    removeCatalogElement: (state, action) => {
      const removeIndex = state.entities.findIndex(e => e._id === action.payload._id);
      state.entities.splice(removeIndex, 1);
    }
  }
});

const { actions, reducer: catalogReducer } = catalogSlice;
const {
  catalogReceved,
  catalogRequested,
  catalogRequestedFiled,
  addCatalogElement,
  editCatalogElement,
  removeCatalogElement
} = actions;

// 'диспатчеры'
export const loadCatalogList = () => async (dispatch, getState) => {
  dispatch(catalogRequested());
  try {
    const content = await catalogService.get();
    dispatch(catalogReceved(content));
  } catch (error) {
    dispatch(catalogRequestedFiled(error));
  }
};

export const createCatalogElement = (data) => async (dispatch) => {
  dispatch(catalogRequested());
  try {
    const content = await catalogService.create(data);
    dispatch(addCatalogElement(content));
  } catch (error) {
    dispatch(catalogRequestedFiled(error));
  }
};

export const updatedCatalogElement = (data) => async (dispatch) => {
  dispatch(catalogRequested());
  try {
    const content = await catalogService.edit(data);
    dispatch(editCatalogElement(content));
  } catch (error) {
    dispatch(catalogRequestedFiled(error));
  }
};

export const deleteCatalogElement = (data) => async (dispatch) => {
  dispatch(catalogRequested());
  try {
    await catalogService.remove(data);
    dispatch(removeCatalogElement(data));
  } catch (error) {
    dispatch(catalogRequestedFiled(error));
  }
};

// селекторы
export const getCatalogList = () => (state) => state.catalog.entities;

export const getCatalogListAfterFilterCategory = (catalog) => (state) => {
  const categoriesIsTrueArray = state.filter.entities.categories
    .reduce((acc, cat) => (cat && cat.checked) ? [...acc, cat._id] : acc, []);
  return catalog.filter(el => categoriesIsTrueArray.indexOf(el.category) !== -1);
};

export const getCatalogListAfterFilterPrice = (catalog) => (state) => {
  const priceInterval = state.filter.entities.price.interval;
  return catalog.filter(el => el.price >= priceInterval[0] && el.price <= priceInterval[1]);
};

export default catalogReducer;
