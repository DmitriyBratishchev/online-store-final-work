import { createAction, createSlice } from '@reduxjs/toolkit';
import authService from '../services/auth.service';
import localStorageService, { setTokens } from '../services/localStorage.service';
import userService from '../services/user.service';
import history from '../utils/history';
import { generateAuthError } from '../utils/generateAuthError';

const plainState = {
  entities: {
    basket: [],
    favorites: []
  },
  isloading: false,
  error: null,
  auth: null,
  isLoggedIn: false,
  dataLoaded: false
};

const initialState = localStorageService.getUserId()
  ? { ...plainState, auth: { userId: localStorageService.getUserId() } }
  : plainState;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userRequested: (state) => {
      state.isloading = true;
    },
    userReceved: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isloading = false;
    },
    userRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isloading = false;
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.error = null;
      state.isLoggedIn = true;
    },
    authRequestFaild: (state, action) => {
      state.error = action.payload;
    },
    userLoggedOut: (state, action) => {
      state.entities = action.payload.entities;
      state.auth = null;
      state.isLoggedIn = false;
      state.dataLoaded = false;
    },
    updateBasket: (state, action) => {
      state.entities.basket = action.payload;
    },
    updateFavorit: (state, action) => {
      state.entities.favorites = action.payload;
    },
    updateUserDataRequested: (state) => {
      state.isloading = true;
    },
    updateUserDataReceved: (state, action) => {
      state.entities = action.payload;
      state.isloading = false;
    },
    updateUserDataFaild: (state, action) => {
      state.error = action.payload;
      state.isloading = false;
    }
  }
});

const { actions, reducer: userReducer } = userSlice;
const {
  userRequested,
  userReceved,
  userRequestFiled,
  authRequestSuccess,
  authRequestFaild,
  userLoggedOut,
  updateBasket,
  updateFavorit,
  updateUserDataReceved,
  updateUserDataRequested,
  updateUserDataFaild
} = actions;

const authRequested = createAction('users/requested');
const userCreateRequested = createAction('users/userCreateRequested');

// диспатчер вход по логину и паролю
export const login = ({ payload, redirect }) => async (dispatch, getState) => {
  const isAuth = getState().user.auth;
  const { email, password } = payload;
  dispatch(authRequested());
  try {
    // проверка данных и получение токенов
    const { data } = await authService.login({ email, password });
    await dispatch(authRequestSuccess({ userId: data.userId }));
    // сохранение токенов
    setTokens(data);
    // получение данных о пользователе
    const user = await userService.getCurrentUser();
    // проверка и сохранение корзины и избранного изменённых до входа по логину
    const currentBasket = getState().user.entities.basket;
    const currentFavorites = getState().user.entities.favorites;
    if (!isAuth && (currentBasket !== 0 || currentFavorites !== 0)) {
      const getUserWithCurrentState = {
        ...user,
        basket: summaryBasket(user.basket, currentBasket),
        favorites: summaryFavorites(user.favorites, currentFavorites)
      };
      const data = await userService.update(getUserWithCurrentState);
      await dispatch(userReceved(data));
    } else {
      dispatch(userReceved(user));
    }
    history.push('/catalog');
  } catch (error) {
    const { code, message, errors } = error.response.data.error;
    if (code === 400) {
      if (errors) {
        dispatch(authRequestFaild(errors[0].msg));
      } else {
        const errorMessage = generateAuthError(message);
        dispatch(authRequestFaild(errorMessage));
      }
    } else {
      dispatch(authRequestFaild(message));
    }
  }
};

const summaryBasket = (arr1, arr2) => {
  let summaryArr = [...arr1];
  arr2.forEach(el => {
    const index = summaryArr.findIndex(n => n._id === el._id);
    index === -1
      ? summaryArr = [...summaryArr, el]
      : summaryArr[index] = { ...el, count: el.count + summaryArr[index].count };
  });
  return summaryArr;
};

const summaryFavorites = (arr1, arr2) => {
  const filteredArr2 = arr2.filter(el => arr1.indexOf(el) === -1);
  return [...arr1, ...filteredArr2];
};

// диспатчер создание нового пользователя
export const signUp = ({ email, password, ...rest }) => async (dispatch, getState) => {
  const isAuth = getState().user.auth;
  const basket = !isAuth ? getState().user.entities.basket : [];
  const favorites = !isAuth ? getState().user.entities.favorites : [];
  dispatch(userRequested());
  try {
    const { data } = await authService.register({ email, password });
    dispatch(authRequestSuccess({ userId: data.userId }));
    // запись токенов в local storage
    setTokens(data);
    // вызов функции создания нового пользователя
    dispatch(createUser({
      _id: data.userId,
      email,
      basket,
      favorites,
      image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1).toString(36).slice(-5)}.svg`,
      ...rest
    }));
  } catch (error) {
    const { code, message, errors } = error.response.data.error;
    if (code === 400) {
      if (errors) {
        dispatch(authRequestFaild(errors[0].msg));
      } else {
        const errorMessage = generateAuthError(message);
        dispatch(authRequestFaild(errorMessage));
      }
    } else {
      dispatch(authRequestFaild(message));
    }
  }
};

function createUser(payload) {
  return async function (dispatch) {
    dispatch(userCreateRequested());
    try {
      // запросна создание нового пользователя
      const content = await userService.create(payload);
      dispatch(userReceved(content));
      history.push('/catalog');
    } catch (error) {
      dispatch(userRequestFiled(error.message));
    }
  };
};

export const updateUserData = (localData) => async (dispatch) => {
  if (!localData.auth) return;
  dispatch(updateUserDataRequested());
  try {
    const data = await userService.update(localData.entities);
    dispatch(updateUserDataReceved(data));
  } catch (error) {
    dispatch(updateUserDataFaild(error.message));
  }
};

export const logOut = () => async (dispatch) => {
  localStorageService.removeAuthData();
  dispatch(userLoggedOut(initialState));
  history.push('/');
};

export const loadCurrentUser = () => async (dispatch) => {
  if (localStorageService.getUserId()) {
    dispatch(userRequested());
    try {
      const content = await userService.getCurrentUser();
      dispatch(userReceved(content));
    } catch (error) {
      dispatch(logOut());
      dispatch(userRequestFiled(error.message));
    }
  }
};

// работа с корзиной пользователя
export const editBasket = (dataProduct) => async (dispatch, getState) => {
  let basket = [...getState().user.entities.basket];
  const arrIdProduct = basket.map(el => el._id);
  if (arrIdProduct.includes(dataProduct._id)) {
    basket = basket.map(el => el._id === dataProduct._id ? { ...el, count: dataProduct.count } : el).filter(el => el.count !== 0);
  } else {
    basket.push(dataProduct);
  }
  dispatch(updateBasket(basket));
  await dispatch(updateUserData(getState().user));
};

// работа с избранным пользователя
export const editFavorit = (idProduct) => async (dispatch, getState) => {
  let favorit = [...getState().user.entities.favorites];
  favorit.indexOf(idProduct) !== -1
    ? favorit = favorit.filter(el => el !== idProduct)
    : favorit.push(idProduct);
  dispatch(updateFavorit(favorit));
  await dispatch(updateUserData(getState().user));
};

export const deleteAuthError = () => (dispatch) => {
  dispatch(userRequestFiled(null));
};

// Селекторы
export const getUser = () => (state) => state.user.entities;
export const getCurrentUserId = () => (state) => state.user.auth?.userId;
export const getAuthError = () => (state) => state.user.error;
export const getAvatar = () => (state) => state.user.entities?.image;
export const getUserName = () => (state) => state.user.entities?.name || '';

export const getCountByIdProduct = (id) => (state) => state.user.entities.basket.find(product => product._id === id)?.count || 0;
export const getBasketLength = () => (state) => state.user.entities.basket.reduce((acc, el) => acc + el.count, 0);
export const getIsFavoritById = (id) => (state) => state.user.entities.favorites.indexOf(id) !== -1;
export const getFavoritesLength = () => (state) => state.user.entities.favorites.length;

export const getUsersLoadingStatus = () => (state) => state.user.isloading;
export const getIsLoggedIn = () => (state) => state.user.isLoggedIn;
export const getDataStatus = () => (state) => state.user.dataLoaded;

export default userReducer;
