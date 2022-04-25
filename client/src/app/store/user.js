import { createAction, createSlice } from '@reduxjs/toolkit';
import authService from '../services/auth.service';
import localStorageService, { setTokens } from '../services/localStorage.service';
import userService from '../services/user.service';
// import { getRandomNumber } from '../utils/getRandomNumber';

const initialState = localStorageService.getUserId() ? {
  entities: {},
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
    userCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    userLoggedOut: (state) => {
      state.entities = [];
      state.auth = null;
      state.isLoggedIn = false;
      state.dataLoaded = false;
    },
    updateUserDataRequested: (state) => {
      state.isloading = true;
    },
    updateUserDataReceved: (state, action) => {
      state.entities = state.entities.map(u => u._id === action.payload._id ? action.payload : u);
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
  // userCreated,
  userLoggedOut,
  updateUserDataReceved,
  updateUserDataRequested,
  updateUserDataFaild
} = actions;

const authRequested = createAction('users/requested');
const userCreateRequested = createAction('users/userCreateRequested');
// const createUserFailed = createAction('users/createUserFailed');

export const login = ({ payload, redirect }) => async (dispatch) => {
  const { email, password } = payload;
  dispatch(authRequested());
  try {
    const data = await authService.login(email, password);
    dispatch(authRequestSuccess({ userId: data.localId }));
    setTokens(data);
    history.push(redirect);
  } catch (error) {
    const { code, message } = error.response.data.error;
    if (code === 400) {
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
    const data = await authService.register({ email, password });
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
    dispatch(authRequestFaild(error.message));
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

export const updateUserData = (data) => async (dispatch) => {
  dispatch(updateUserDataRequested());
  try {
    const { content } = await userService.update(data);
    dispatch(updateUserDataReceved(content));
    history.push(`/users/${content._id}`);
  } catch (error) {
    dispatch(updateUserDataFaild(error.message));
  }
};

export const logOut = () => (dispatch) => {
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

// export const loadUsersList = () => async (dispatch) => {
//   dispatch(userRequested());
//   try {
//     const { content } = await userService.get();
//     dispatch(userReceved(content));
//   } catch (error) {
//     dispatch(userRequestFiled(error.message));
//   }
// };

export const deleteAuthError = () => (dispatch) => {
  dispatch(userRequestFiled(null));
};

// Селекторы
export const getUser = () => (state) => state.user.entities;
export const getUserById = (userId) => (state) => {
  if (state.users.entities.length) {
    return state.users.entities.find(u => u._id === userId);
  } else return null;
};
export const getUsers = () => (state) => state.users.entities;
export const getCurrentUser = () => (state) => {
  if (state.users.entities.length) {
    return state.users.entities.find(u => u._id === state.users.auth.userId);
  } else return null;
};

export const getUsersLoadingStatus = () => (state) => state.users.isloading;
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getCurrentUserId = () => (state) => state.users.auth.userId;
// export const getAuthError = () => (state) => state.users.error || [];

export default userReducer;
