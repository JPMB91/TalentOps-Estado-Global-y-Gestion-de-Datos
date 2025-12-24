export const ACTION = {
  PRODUCT_LOADING_START: "CARGAR_PRODUCTOS_INICIO",
  PRODUCT_LOADING_SUCCESS: "CARGAR_PRODUCTOS_EXITO",
  PRODUCT_LOADING_ERROR: "CARGAR_PRODUCTOS_ERROR",

  PRODUCT_CREATE_SUCCESS: "CREAR_PRODUCTO_EXITO",
  PRODUCT_UPDATE_SUCCESS: "ACTUALIZAR_PRODUCTO_EXITO",
  PRODUCT_DELETE_SUCCESS: "ELIMINAR_PRODUCTO_EXITO",

  SET_ERROR: "ESTABLECER_ERROR",
  CLEAR_ERROR: "LIMPIAR_ERROR",
};

export const initialState = {
  productos: [],
  loading: false,
  error: null,
  ultimaActualizacion: null,
};

export const productoReducer = (state, action) => {
  switch (action.type) {
    case ACTION.PRODUCT_LOADING_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ACTION.PRODUCT_LOADING_SUCCESS:
      return {
        ...state,
        loading: false,
        productos: action.payload,
        error: null,
        ultimaActualizacion: Date.now(),
      };

    case ACTION.PRODUCT_LOADING_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case ACTION.PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        productos: [...state.productos, action.payload],
        error: null,
      };
    case ACTION.PRODUCT_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        productos: state.productos.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
        error: null,
      };
    case ACTION.PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        productos: state.productos.filter((p) => p.id !== action.payload),
        error: null,
      };

    case ACTION.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case ACTION.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
