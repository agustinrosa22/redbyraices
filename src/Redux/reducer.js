// Redux Reducer

import {  LOGIN_SUCCESS, 
          LOGIN_FAIL,  
          GET_USER_SUCCESS, 
          GET_USER_FAIL, 
          CREATE_PROPERTY_SUCCESS, 
          CREATE_PROPERTY_FAIL, 
          GET_ALL_USERS_SUCCESS, 
          GET_ALL_USERS_FAIL,
          UPDATE_MAP_LOCATION,
          UPLOAD_IMAGE_SUCCESS,
          UPLOAD_IMAGE_FAIL,
          GET_PROPERTIES_BY_SELLER_ID_SUCCESS,
          GET_PROPERTIES_BY_SELLER_ID_FAIL,
          EDIT_PROPERTY_REQUEST,
          EDIT_PROPERTY_SUCCESS,
          EDIT_PROPERTY_FAIL,
          GET_PROPERTY_BY_ID,
         } from './Actions/actionTypes';

const initialState = {
  properties: [],
  user: null,
  userId: null,
  userDetails: null,
  users: [],
  error: null,
  propertyCreationError: null,
  mapLocation: null,
  imageUploadError: null,
  propertiesBySellerId: [],
  property: null,
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
      case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        error: null,
      };
    case GET_ALL_USERS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
      case UPDATE_MAP_LOCATION:
        return {
          ...state,
          mapLocation: action.payload,
        };
        case UPLOAD_IMAGE_SUCCESS:
          return {
            ...state,
            imageUploadError: null,
            // Actualizar el estado según sea necesario para la carga de imágenes exitosa
          };
        case UPLOAD_IMAGE_FAIL:
          return {
            ...state,
            imageUploadError: action.payload,
            // Manejar la acción de carga de imágenes fallida
          };
          case GET_PROPERTIES_BY_SELLER_ID_SUCCESS:
      return {
        ...state,
        propertiesBySellerId: action.payload,
        error: null
      };
    case GET_PROPERTIES_BY_SELLER_ID_FAIL:
      return {
        ...state,
        propertiesBySellerId: [],
        error: action.payload
      };
      case EDIT_PROPERTY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case EDIT_PROPERTY_SUCCESS:
      return {
        ...state,
        properties: state.properties.map((property) =>
          property.id === action.payload.id ? action.payload : property
        ),
        loading: false,
        error: null,
      };
    case EDIT_PROPERTY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case GET_PROPERTY_BY_ID:
        return {
          ...state,
          property: action.payload,
        };
    default:
      return state;
  }
};


export default rootReducer;