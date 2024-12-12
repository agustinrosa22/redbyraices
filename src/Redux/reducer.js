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
          GET_PROPERTIES_PENDING_SUCCESS, 
          GET_PROPERTIES_PENDING_FAIL,
          GET_PROPERTIES_LIST_SUCCESS,
          GET_PROPERTIES_LIST_FAIL, 
          CREATE_USER_REQUEST,
          CREATE_USER_SUCCESS,
          CREATE_USER_FAIL,
          GET_ALL_SELLERS_SUCCESS,
          GET_ALL_SELLERS_FAIL,
          UPDATE_SELLER_REQUEST,
          UPDATE_SELLER_SUCCESS,
          UPDATE_SELLER_FAIL,
          GET_SELLER_BY_ID_REQUEST,
          GET_SELLER_BY_ID_SUCCESS,
          GET_SELLER_BY_ID_FAILURE,
          CREATE_VISITA_REQUEST,
          CREATE_VISITA_SUCCESS,
          CREATE_VISITA_FAIL,
          GET_ALL_VISITAS_REQUEST,
          GET_ALL_VISITAS_SUCCESS,
          GET_ALL_VISITAS_FAIL,
          GET_VISITAS_BY_PROPERTY_REQUEST,
          GET_VISITAS_BY_PROPERTY_SUCCESS,
          GET_VISITAS_BY_PROPERTY_FAIL,
          GET_PROPERTIES_BY_SELLER,
          GET_PROPERTIES_BY_SELLER_ERROR,
          GET_PROPERTIES_CLOSED_BY_SELLER_ID_SUCCESS,
          GET_PROPERTIES_CLOSED_BY_SELLER_ID_FAIL,
          FETCH_RENTALS_REQUEST,
          FETCH_RENTALS_SUCCESS,
          FETCH_RENTALS_FAILURE,
          FETCH_RENTAL_REQUEST,
          FETCH_RENTAL_SUCCESS,
          FETCH_RENTAL_FAILURE,
          CREATE_RENTAL_REQUEST,
          CREATE_RENTAL_SUCCESS,
          CREATE_RENTAL_FAILURE,
          UPDATE_RENTAL_REQUEST,
          UPDATE_RENTAL_SUCCESS,
          UPDATE_RENTAL_FAILURE,
          DELETE_RENTAL_REQUEST,
          DELETE_RENTAL_SUCCESS,
          DELETE_RENTAL_FAILURE,   
         } from './Actions/actionTypes';

const initialState = {
  properties: [],
  user: JSON.parse(localStorage.getItem('user')) || null,
  userId: localStorage.getItem('userId') || null,
  userType: localStorage.getItem('userType') || null,
  userDetails: null,
  users: [],
  propertyCreationError: null,
  mapLocation: null,
  imageUploadError: null,
  propertiesBySellerId: [],
  propertiesClosedBySellerId: [],
  property: null,
  pendingProperties: [], 
  activeProperties: [], 
  seller: null,
  sellers: [],
  sellerProperties: {},
  selleredit: null,
  loading: false,
  error: null,
  visitas: [],
  rentals: [], 
  rental: null, 
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
        case 'CREATE_PROPERTY_REQUEST':
          return {
              ...state,
              loading: true,
          };
      case 'CREATE_PROPERTY_SUCCESS':
          return {
              ...state,
              loading: false,
              property: action.payload,
              error: null,
          };
      case 'CREATE_PROPERTY_FAIL':
          return {
              ...state,
              loading: false,
              error: action.payload,
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
      case GET_PROPERTIES_CLOSED_BY_SELLER_ID_SUCCESS:
      return {
        ...state,
        propertiesClosedBySellerId: action.payload,
        error: null
      };
    case GET_PROPERTIES_CLOSED_BY_SELLER_ID_FAIL:
      return {
        ...state,
        propertiesClosedBySellerId: [],
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
        case GET_PROPERTIES_PENDING_SUCCESS:
          return {
            ...state,
            pendingProperties: action.payload,
            loading: false,
          };
    
        case GET_PROPERTIES_PENDING_FAIL:
          return {
            ...state,
            error: action.payload,
            loading: false,
          };
          case GET_PROPERTIES_LIST_SUCCESS:
            return {
              ...state,
              activeProperties: action.payload,
              loading: false,
            };
      
          case GET_PROPERTIES_LIST_FAIL:
            return {
              ...state,
              error: action.payload,
              loading: false,
            };
            case CREATE_USER_REQUEST:
              return { ...state, loading: true };
        
            case CREATE_USER_SUCCESS:
              return { ...state, loading: false, seller: action.payload };
        
            case CREATE_USER_FAIL:
              return { ...state, loading: false, error: action.payload };
              case GET_ALL_SELLERS_SUCCESS:
                return {
                  ...state,
                  sellers: action.payload, // Guarda la lista de vendedores en el estado
                  error: null
                };
              case GET_ALL_SELLERS_FAIL:
                return {
                  ...state,
                  sellers: [], // Limpia la lista de vendedores en caso de fallo
                  error: action.payload
                };
                case UPDATE_SELLER_REQUEST:
                  return {
                    ...state,
                    loading: true,
                    error: null,
                  };
                  
                case UPDATE_SELLER_SUCCESS:
                  return {
                    ...state,
                    sellers: Array.isArray(state.sellers) 
                      ? state.sellers.map((seller) => 
                          seller.id === action.payload.id ? action.payload : seller
                        )
                      : [],  // Aseguramos que sellers sea siempre un array
                    loading: false,
                    error: null,
                  };
            
                case UPDATE_SELLER_FAIL:
                  return {
                    ...state,
                    loading: false,
                    error: action.payload,
                  };
                  case CREATE_VISITA_REQUEST:
                    case GET_ALL_VISITAS_REQUEST:
                    case GET_VISITAS_BY_PROPERTY_REQUEST:
                      return { ...state, loading: true };
                
                    case CREATE_VISITA_SUCCESS:
                      return {
                        ...state,
                        loading: false,
                        visitas: [...state.visitas, action.payload], // Añade la nueva visita
                      };
                
                    case GET_ALL_VISITAS_SUCCESS:
                      return {
                        ...state,
                        loading: false,
                        visitas: action.payload, // Carga todas las visitas
                      };
                
                    case GET_VISITAS_BY_PROPERTY_SUCCESS:
                      return {
                        ...state,
                        loading: false,
                        visitas: action.payload, // Carga visitas de una propiedad específica
                      };
                
                    case CREATE_VISITA_FAIL:
                    case GET_ALL_VISITAS_FAIL:
                    case GET_VISITAS_BY_PROPERTY_FAIL:
                      return {
                        ...state,
                        loading: false,
                        error: action.payload, // Manejo de errores
                      };
                      case GET_PROPERTIES_BY_SELLER:
                        return {
                          ...state,
                          sellerProperties: {
                            ...state.sellerProperties,
                            [action.payload.sellerId]: action.payload.properties, // Asigna las propiedades por sellerId
                          },
                        };
                      case GET_PROPERTIES_BY_SELLER_ERROR:
                        // Maneja otros errores si es necesario
                        return state; 
                        case FETCH_RENTALS_REQUEST:
                          return {
                            ...state,
                            loading: true,
                            error: null,
                          };
                        case FETCH_RENTALS_SUCCESS:
                          return {
                            ...state,
                            loading: false,
                            rentals: action.payload, // Supongamos que payload es un array de rentas
                            error: null,
                          };
                        case FETCH_RENTALS_FAILURE:
                          return {
                            ...state,
                            loading: false,
                            error: action.payload,
                          };
                    
                        case FETCH_RENTAL_REQUEST:
                          return {
                            ...state,
                            loading: true,
                            error: null,
                          };
                        case FETCH_RENTAL_SUCCESS:
                          return {
                            ...state,
                            loading: false,
                            rental: action.payload, // Supongamos que payload es un objeto de renta
                            error: null,
                          };
                        case FETCH_RENTAL_FAILURE:
                          return {
                            ...state,
                            loading: false,
                            error: action.payload,
                          };
                    
                        case CREATE_RENTAL_REQUEST:
                          return {
                            ...state,
                            loading: true,
                            error: null,
                          };
                        case CREATE_RENTAL_SUCCESS:
                          return {
                            ...state,
                            loading: false,
                            rentals: [...state.rentals, action.payload], // Agregar la nueva renta a la lista
                            error: null,
                          };
                        case CREATE_RENTAL_FAILURE:
                          return {
                            ...state,
                            loading: false,
                            error: action.payload,
                          };
                    
                        case UPDATE_RENTAL_REQUEST:
                          return {
                            ...state,
                            loading: true,
                            error: null,
                          };
                        case UPDATE_RENTAL_SUCCESS:
                          return {
                            ...state,
                            loading: false,
                            rentals: state.rentals.map((rental) =>
                              rental.id === action.payload.id ? action.payload : rental
                            ), // Actualizar la renta modificada
                            error: null,
                          };
                        case UPDATE_RENTAL_FAILURE:
                          return {
                            ...state,
                            loading: false,
                            error: action.payload,
                          };
                    
                        case DELETE_RENTAL_REQUEST:
                          return {
                            ...state,
                            loading: true,
                            error: null,
                          };
                        case DELETE_RENTAL_SUCCESS:
                          return {
                            ...state,
                            loading: false,
                            rentals: state.rentals.filter((rental) => rental.id !== action.payload), // Eliminar la renta
                            error: null,
                          };
                        case DELETE_RENTAL_FAILURE:
                          return {
                            ...state,
                            loading: false,
                            error: action.payload,
                          };
                    

                  
    default:
      return state;
  }
};


export default rootReducer;