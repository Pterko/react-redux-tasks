import { login as loginApi } from "../../api";

import { SuccessToaster, ErrorToaster } from "../../components/UI/atoms";
// Initial state
export const userInitialState = {
  isLoggedIn: !!localStorage.getItem("user_auth_token"),
  isLoginInProgress: false,
  token: localStorage.getItem("user_auth_token") || null,
  isLoginPopupOpen: false
};

const LOGIN_POPUP_OPEN = "LOGIN_POPUP_OPEN";
const LOGIN_POPUP_CLOSE = "LOGIN_POPUP_CLOSE";

const LOGIN_IN_PROGRESS = "LOGIN_IN_PROGRESS";
const LOGIN_FAILED = "LOGIN_FAILED";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";

const LOGOUT = "LOGOUT";

// Reducer
export default function userReducer(state = {}, action = {}) {
  switch (action.type) {
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        token: null
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        isLoggedIn: true,
        isLoginInProgress: false,
        isLoginPopupOpen: false
      };
    case LOGIN_FAILED:
      return { ...state, isLoginInProgress: false };
    case LOGIN_IN_PROGRESS:
      return { ...state, isLoginInProgress: true };
    case LOGIN_POPUP_OPEN:
      return { ...state, isLoginPopupOpen: true };
    case LOGIN_POPUP_CLOSE:
      return { ...state, isLoginPopupOpen: false };
    default:
      return state;
  }
}

export function openLoginPopup() {
  return { type: LOGIN_POPUP_OPEN };
}

export function closeLoginPopup() {
  return { type: LOGIN_POPUP_CLOSE };
}

export function loginSuccess(token) {
  SuccessToaster.showIntent({ message: "Вход успешно выполнен" });
  localStorage.setItem("user_auth_token", token);
  return { type: LOGIN_SUCCESS, token };
}

export function loginFailed() {
  ErrorToaster.showIntent({ message: "Учётные данные не найдены" });
  return { type: LOGIN_FAILED };
}

export function loginInProgress(token) {
  return { type: LOGIN_IN_PROGRESS, token };
}

export function login(username, password) {
  return dispatch => {
    loginApi(username, password)
      .then(result => {
        dispatch(loginSuccess(result.token));
      })
      .catch(() => {
        dispatch(loginFailed());
      });
  };
}

export function logout() {
  localStorage.removeItem("user_auth_token");
  return { type: LOGOUT };
}
