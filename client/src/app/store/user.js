import { createAction, createSlice } from '@reduxjs/toolkit';
import authService from '../services/auth.service';
import localStorageService, { setTokens } from '../services/localStorage.service';
import userService from '../services/user.service';
import history from '../utils/history';
// import { getRandomNumber } from '../utils/getRandomNumber';

const initialState = localStorageService.getUserId() ? {
  entities: {
    basket: [],
    favorites: []
  },
  isloading: true,
  error: null,
  auth: { userId: localStorageService.getUserId() },
  isLoggedIn: true,
  dataLoaded: false
} : {
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
    userLoggedOut: (state) => {
      console.log('state', state);
      console.log('initialState', initialState);
      state = initialState;
      // state.auth = null;
      // state.isLoggedIn = false;
      // state.dataLoaded = false;
    },
    updateBasket: (state, action) => {
      state.entities.basket = action.payload;
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
  updateUserDataReceved,
  updateUserDataRequested,
  updateUserDataFaild
} = actions;

const authRequested = createAction('users/requested');
const userCreateRequested = createAction('users/userCreateRequested');
// const createUserFailed = createAction('users/createUserFailed');

// диспатчер вход по логину и паролю
export const login = ({ payload, redirect }) => async (dispatch) => {
  const { email, password } = payload;
  console.log('payload login', payload);
  dispatch(authRequested());
  try {
    // проверка данных и получение токенов
    const { data } = await authService.login({ email, password });
    dispatch(authRequestSuccess({ userId: data.userId }));
    console.log('payload login data', data, 'redirect', redirect);
    // сохранение токенов
    setTokens(data);
    // получение данных о пользователе
    const user = await userService.getCurrentUser();
    dispatch(userReceved(user));
    history.push('/catalog');
  } catch (error) {
    const { code, message } = error.response.data.error;
    if (code === 400) {
      console.log('message', message);
      // const errorMessage = generateAuthError(message);
      const errorMessage = 'что-то пошло не так';
      dispatch(authRequestFaild(errorMessage));
    } else {
      dispatch(authRequestFaild(message));
    }
  }
};

// диспатчер создание нового пользователя
export const signUp = ({ email, password, ...rest }) => async (dispatch) => {
  dispatch(userRequested());
  console.log('in reducer');
  try {
    const { data } = await authService.register({ email, password });
    // запись токенов в local storage
    setTokens(data);
    // dispatch(authRequestSuccess({ userId: data.userId }));
    // вызов функции создания нового пользователя
    dispatch(createUser({
      _id: data.userId,
      email,
      image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1).toString(36).slice(-5)}.svg`,
      ...rest
    }));
  } catch (error) {
    const { code, message } = error.response.data.error;
    if (code === 400) {
      console.log('message', message);
      // const errorMessage = generateAuthError(message);
      const errorMessage = 'что-то пошло не так Пользователь существует';
      dispatch(authRequestFaild(errorMessage));
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
      console.log('createUser content', content);
      // запись данных в state
      dispatch(userReceved(content));
      history.push('/catalog');
    } catch (error) {
      dispatch(userRequestFiled(error.message));
    }
  };
};

export const updateUserData = (localData) => async (dispatch) => {
  console.log('start update');
  dispatch(updateUserDataRequested());
  try {
    const data = await userService.update(localData);
    console.log('in update res', data);
    dispatch(updateUserDataReceved(data));
    // history.push(`/users/${content._id}`);
  } catch (error) {
    dispatch(updateUserDataFaild(error.message));
  }
};

export const logOut = () => (dispatch) => {
  console.log('logout');
  localStorageService.removeAuthData();
  dispatch(userLoggedOut());
  history.push('/');
};

export const loadCurrentUser = () => async (dispatch) => {
  dispatch(userRequested());
  try {
    const content = await userService.getCurrentUser();
    dispatch(userReceved(content));
  } catch (error) {
    dispatch(userRequestFiled(error.message));
  }
};

// работа с корзиной пользователя
export const editBasket = (dataProduct) => async (dispatch, getState) => {
  let basket = [...getState().user.entities.basket];
  console.log('basket in user dispatcher start', basket, dataProduct);
  const arrIdProduct = basket.map(el => el._id);
  if (arrIdProduct.includes(dataProduct._id)) {
    basket = basket.map(el => el._id === dataProduct._id ? { ...el, count: dataProduct.count } : el).filter(el => el.count !== 0);
  } else {
    basket.push(dataProduct);
  }
  console.log('basket in user dispatcher end', basket);
  dispatch(updateBasket(basket));
  await dispatch(updateUserData(getState().user.entities));
};

export const deleteAuthError = () => (dispatch) => {
  dispatch(userRequestFiled(null));
};

// Селекторы
export const getUser = () => (state) => state.user.entities;
export const getCurrentUserId = () => (state) => state.user.auth?.userId;
export const getAuthError = () => (state) => state.user.error;
export const getAvatar = () => (state) => state.user.entities?.image;

export const getCountByIdProduct = (id) => (state) => state.user.entities.basket.find(product => product._id === id)?.count || 0;
export const getBasketLength = () => (state) => state.user.entities.basket.reduce((acc, el) => acc + el.count, 0);
// export const getUserById = (userId) => (state) => {
//   if (state.user.entities.length) {
//     return state.user.entities.find(u => u._id === userId);
//   } else return null;
// };
// export const getUser = () => (state) => state.users.entities;
// export const getCurrentUser = () => (state) => {
//   if (state.user.entities.length) {
//     return state.user.entities.find(u => u._id === state.users.auth.userId);
//   } else return null;
// };

export const getUsersLoadingStatus = () => (state) => state.users.isloading;
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getDataStatus = () => (state) => state.users.dataLoaded;
// export const getAuthError = () => (state) => state.users.error || [];

export default userReducer;
