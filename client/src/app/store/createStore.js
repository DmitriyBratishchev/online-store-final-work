import { combineReducers, configureStore } from '@reduxjs/toolkit';
import basketReducer from './basket';
import catalogReducer from './catalog';
import categoriesReducer from './categories';
import userReducer from './user';

const rootReducer = combineReducers({
  catalog: catalogReducer,
  categories: categoriesReducer,
  user: userReducer,
  basket: basketReducer
});

export function createStore() {
  return configureStore({
    reducer: rootReducer
  });
}
