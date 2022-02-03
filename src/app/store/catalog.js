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
    }
  }
});

const { actions, reducer: catalogReducer } = catalogSlice;
const {
  catalogReceved,
  catalogRequested,
  catalogRequestedFiled,
  addCatalogElement
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

export default catalogReducer;
