import { combineReducers, configureStore } from '@reduxjs/toolkit';
import catalogReducer from './catalog';
import categoriesReducer from './categories';

const rootReducer = combineReducers({
  catalog: catalogReducer,
  categories: categoriesReducer
});

export function createStore() {
  return configureStore({
    reducer: rootReducer
  });
}
