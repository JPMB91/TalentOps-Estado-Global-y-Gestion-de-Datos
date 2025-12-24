import { createContext, useCallback, useContext, useReducer } from "react";
import { ACTION, initialState, productoReducer } from "./productosReducer";
import { productoService } from "../services/productosService";

export const ProductContext = createContext();

export const ProductosContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productoReducer, initialState);

  const cargarProductos = useCallback(async () => {
    try {
      const productos = await productoService.obtenerTodosProductos();
      dispatch({ type: ACTION.PRODUCT_LOADING_START, payload: productos });
    } catch (error) {
      dispatch({
        type: ACTION.PRODUCT_LOADING_ERROR,
        payload: error.message,
      });
    }
  }, []);

  const cargarProductoId = useCallback(async (id) => {
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
      return nuevoProducto;
    } catch (error) {
      dispatch({
        type: ACTION.SET_ERROR,
        payload: error.message,
      });
    }
  }, []);
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
      return productoActualizado;
    } catch (error) {
      dispatch({
        type: ACTION.SET_ERROR,
        payload: error.message,
      });
    }
  }, []);

  const eliminarProducto = useCallback(async (id) => {
    try {
      await productoService.eliminarProducto(id);
      dispatch({ type: ACTION.PRODUCT_DELETE_SUCCESS, payload: id });
      return id;
    } catch (error) {
      dispatch({
        type: ACTION.SET_ERROR,
        payload: error.message,
      });
    }
  }, []);

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
export const useProductos = ()=>{
  const context = useContext(ProductContext)
  if(!context){
    throw new Error("Error en la llamada al contexto")
  }
  return context;
}

