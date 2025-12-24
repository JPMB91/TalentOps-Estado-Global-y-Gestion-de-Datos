import { useEffect, useState, useMemo } from "react";
import { useProductos } from '../context/productContext';
import ProductoItem from "./ProductoItem";
import FormularioProducto from "./FormularioProducto";
import Buscador from "./Buscador";

const ListaProductos = () => {
  const { productos, loading, error, cargarProductos } = useProductos();
  const [productoEditar, setProductoEditar] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("");

  useEffect(() => {
    cargarProductos();
  }, [cargarProductos]);

  // obtener categorias
  const categorias = useMemo(() => {
    return [...new Set(productos.map((p) => p.categoria))];
  }, [productos]);

  // filtrar productos
  const productosFiltrados = useMemo(() => {
    return productos.filter((producto) => {
      const coincideBusqueda =
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        producto.descripcion.toLowerCase().includes(busqueda.toLowerCase());
      const coincideCategoria =
        !categoriaFiltro || producto.categoria === categoriaFiltro;

      return coincideBusqueda && coincideCategoria;
    });
  }, [productos, busqueda, categoriaFiltro]);

  const handleEditar = (producto) => {
    setProductoEditar(producto);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelarEdicion = () => {
    setProductoEditar(null);
  };

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
        <button onClick={cargarProductos}>Reintentar</button>
      </div>
    );
  }

  return (
    <div className="container">
      <FormularioProducto
        productoEditar={productoEditar}
        onCancelar={handleCancelarEdicion}
      />

      <div className="productos-section">
        <h2>Lista de Productos ({productosFiltrados.length})</h2>

        <Buscador
          busqueda={busqueda}
          onBusquedaChange={setBusqueda}
          categoriaFiltro={categoriaFiltro}
          onCategoriaChange={setCategoriaFiltro}
          categorias={categorias}
        />

        {loading ? (
          <div className="cargando">⏳ Cargando productos...</div>
        ) : productosFiltrados.length === 0 ? (
          <div className="sin-resultados">
            {productos.length === 0
              ? "📦 No hay productos registrados"
              : "🔍 No se encontraron productos con esos criterios"}
          </div>
        ) : (
          <div className="productos-grid">
            {productosFiltrados.map((producto) => (
              <ProductoItem
                key={producto.id}
                producto={producto}
                onEditar={handleEditar}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListaProductos;
