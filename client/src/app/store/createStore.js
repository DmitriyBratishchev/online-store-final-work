import { combineReducers, configureStore } from '@reduxjs/toolkit';
import catalogReducer from './catalog';
import categoriesReducer from './categories';
import userReducer from './user';

const rootReducer = combineReducers({
  catalog: catalogReducer,
  categories: categoriesReducer,
  user: userReducer
});

export function createStore() {
  return configureStore({
    reducer: rootReducer
  });
}
