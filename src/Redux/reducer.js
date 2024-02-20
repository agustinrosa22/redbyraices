import { LOGIN_SUCCESS, LOGIN_FAIL } from './Actions/actionTypes';

const initialState = {
  user: null,
  error: null
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload, // Guarda solo el usuario en caso de éxito
        error: null // Borra el error en caso de éxito
      };
    case LOGIN_FAIL:
      return {
        ...state,
        user: null,
        error: action.payload
      };
    default:
      return state;
  }
};

export default rootReducer;

