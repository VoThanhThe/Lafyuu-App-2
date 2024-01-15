// UserReducer.js
import { LOGIN_USER, LOGOUT_USER } from '../ActionTypes';

const initialState = {
  user: null,
  isLoggedIn: false,
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};
