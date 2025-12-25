import { createContext, useCallback, useContext, useReducer } from "react";
import { ACTION, initialState, productoReducer } from "./productosReducer";
import { productoService } from "../services/productosService";
import { clearCache, getFromCache, isExpired } from "../utils/cache";

export const ProductContext = createContext();

export const ProductosContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productoReducer, initialState);

  const invalidarCache = useCallback(() => {
    clearCache("cache_productos");
  }, []);

  const cargarProductos = useCallback(async () => {
    dispatch({ type: ACTION.PRODUCT_LOADING_START });
    try {
      //intentar obtener el cache primero
      const cacheData = getFromCache("cache_productos");
      const TTL = 5 * 60 * 1000;

      // si existe se usa el de cache
      if (cacheData && !isExpired(cacheData.timestamp, TTL)) {
        dispatch({
          type: ACTION.PRODUCT_LOADING_SUCCESS,
          payload: cacheData.data,
        });
        return;
      }

      const productos = await productoService.obtenerTodosProductos();
      dispatch({ type: ACTION.PRODUCT_LOADING_SUCCESS, payload: productos });
    } catch (error) {
      dispatch({
        type: ACTION.PRODUCT_LOADING_ERROR,
        payload: error.message,
      });
    }
  }, []);

  const cargarProductoId = useCallback(async (id) => {
    dispatch({ type: ACTION.PRODUCT_LOADING_START });
    try {
      const producto = await productoService.obtenerProdutoId(id);
      dispatch({ type: ACTION.PRODUCT_LOADING_SUCCESS, payload: producto });
    } catch (error) {
      dispatch({
        type: ACTION.SET_ERROR,
        payload: error.message,
      });
    }
  }, []);

  const crearProducto = useCallback(async (producto) => {
    try {
      const nuevoProducto = await productoService.crearProducto(producto);
      dispatch({ type: ACTION.PRODUCT_CREATE_SUCCESS, payload: nuevoProducto });
      invalidarCache();
      console.log(nuevoProducto);
      return nuevoProducto;
    } catch (error) {
      dispatch({
        type: ACTION.SET_ERROR,
        payload: error.message,
      });
    }
  }, [invalidarCache]);
  const actualizarProducto = useCallback(async (id, producto) => {
    try {
      const productoActualizado = await productoService.actualizarProducto(
        id,
        producto
      );
      dispatch({
        type: ACTION.PRODUCT_UPDATE_SUCCESS,
        payload: productoActualizado,
      });
      invalidarCache();
      return productoActualizado;
    } catch (error) {
      dispatch({
        type: ACTION.SET_ERROR,
        payload: error.message,
      });
    }
  }, [invalidarCache]);

  const eliminarProducto = useCallback(async (id) => {
    try {
      await productoService.eliminarProducto(id);
      dispatch({ type: ACTION.PRODUCT_DELETE_SUCCESS, payload: id });
      invalidarCache();
      return id;
    } catch (error) {
      dispatch({
        type: ACTION.SET_ERROR,
        payload: error.message,
      });
    }
  }, [invalidarCache]);

  const limpiarError = useCallback(() => {
    dispatch({ type: ACTION.CLEAR_ERROR });
  }, []);

  const value = {
    productos: state.productos,
    loading: state.loading,
    error: state.error,
    ultimaActualizacion: state.ultimaActualizacion,
    cargarProductos,
    cargarProductoId,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
    limpiarError,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

//hook para uso abreviado
export const useProductos = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("Error en la llamada al contexto");
  }
  return context;
};
