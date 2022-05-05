import { createSlice } from '@reduxjs/toolkit';
import catalogService from '../services/catalog.service';

const initialState = {
  entities: [],
  isLoading: true,
  error: null
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    basketRequested: (state) => {
      state.isLoading = true;
    },
    basketReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    basketRequestedFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { actions, reducer: basketReducer } = basketSlice;
const { basketReceved, basketRequested, basketRequestedFiled } = actions;

// 'диспатчеры'
export const loadBasketList = () => async (dispatch, getState) => {
  const userBasket = getState().user.entities.basket;
  const arrayBasketIds = userBasket.map(el => el._id);
  console.log('arrayBasketIds in load', arrayBasketIds);
  dispatch(basketRequested());
  try {
    const content = await Promise.all(arrayBasketIds.map(id => catalogService.getProductById(id))).then(res => res);
    console.log('content in load', content);
    const basketList = content.map((product, index) => ({ ...product, count: userBasket[index].count }));
    dispatch(basketReceved(basketList));
  } catch (error) {
    console.log('error', error);
    dispatch(basketRequestedFiled(error));
  }
};

// 'Селекторы'
export const getBasketList = () => (state) => state.basket.entities;
// export const getCategoryNameById = (_id) => (state) => state.categories.entities.filter(c => c._id === _id)[0]?.name;

export default basketReducer;
