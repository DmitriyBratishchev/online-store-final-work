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
      const editIndex = state.entities.findIndex(e => e.id === action.payload.id);
      state.entities[editIndex] = action.payload;
    },
    removeCatalogElement: (state, action) => {
      const removeIndex = state.entities.findIndex(e => e.id === action.payload.id);
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
    console.log('content', content);
    dispatch(catalogReceved(content));
  } catch (error) {
    console.log('error', error);
    dispatch(catalogRequestedFiled(error));
  }
};

export const createCatalogElement = (data) => async (dispatch) => {
  dispatch(catalogRequested());
  try {
    const content = await catalogService.create(data);
    console.log('content', content);
    dispatch(addCatalogElement(content));
  } catch (error) {
    console.log('error', error);
    dispatch(catalogRequestedFiled(error));
  }
};

export const updatedCatalogElement = (data) => async (dispatch) => {
  dispatch(catalogRequested());
  try {
    const content = await catalogService.edit(data);
    console.log('content', content);
    dispatch(editCatalogElement(content));
  } catch (error) {
    console.log('error', error);
    dispatch(catalogRequestedFiled(error));
  }
};

export const deleteCatalogElement = (data) => async (dispatch) => {
  dispatch(catalogRequested());
  try {
    await catalogService.remove(data);
    dispatch(removeCatalogElement(data));
  } catch (error) {
    console.log('error', error);
    dispatch(catalogRequestedFiled(error));
  }
};

// селекторы
export const getCatalogList = () => (state) => state.catalog.entities;

export default catalogReducer;
