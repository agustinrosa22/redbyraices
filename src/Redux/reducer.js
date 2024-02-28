// Redux Reducer

import { LOGIN_SUCCESS, LOGIN_FAIL, GET_USER_SUCCESS, GET_USER_FAIL, CREATE_PROPERTY_SUCCESS, CREATE_PROPERTY_FAIL } from './Actions/actionTypes';

const initialState = {
  user: null,
  userId: null,
  userDetails: null,
  error: null,
  propertyCreationError: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        userId: action.payload.userId,
        error: null
      };
    case LOGIN_FAIL:
      return {
        ...state,
        user: null,
        error: action.payload
      };
      case GET_USER_SUCCESS:
        return {
          ...state,
          userDetails: action.payload,
          error: null
        };
      case GET_USER_FAIL:
        return {
          ...state,
          userDetails: null,
          error: action.payload
        };
      case CREATE_PROPERTY_SUCCESS:
        return {
        ...state,
        propertyCreationError: null,
      };
      case CREATE_PROPERTY_FAIL:
        return {
        ...state,
        propertyCreationError: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;