import axios from "axios";

const API_URL = "http://localhost:3001/productos";

export const productoService = {
  obtenerTodosProductos: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  obtenerProdutoId: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  eliminarProducto: async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  },
  actualizarProducto: async (id, producto) => {
    const response = await axios.put(`${API_URL}/${id}`, producto);
    return response.data;
  },

  crearProducto: async (producto) => {
    const response = await axios.post(API_URL,producto);
    return response.data;
  },
};
