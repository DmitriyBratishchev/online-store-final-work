const USERID_KEY = 'user-local-id';

export function setTokens({ localId }) {
  localStorage.setItem(USERID_KEY, localId)
};

export function getUserId() {
  localStorage.getItem(USERID_KEY)
};

const localStorageService = {
  setTokens,
  getUserId
};

export default localStorageService;
