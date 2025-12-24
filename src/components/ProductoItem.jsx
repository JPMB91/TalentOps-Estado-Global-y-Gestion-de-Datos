import { memo } from 'react';
import { useProductos } from '../context/productContext';

const ProductoItem = memo(({ producto, onEditar }) => {
  const { eliminarProducto } = useProductos();

  const handleEliminar = async () => {
    if (window.confirm(`¿Estás seguro de eliminar "${producto.nombre}"?`)) {
      try {
        await eliminarProducto(producto.id);
      } catch (error) {
        console.error('Error al eliminar:', error);
      }
    }
  };

  return (
    <div className="producto-item">
      <div className="producto-info">
        <h3>{producto.nombre}</h3>
        <p className="descripcion">{producto.descripcion}</p>
        <div className="detalles">
          <span className="precio">${producto.precio}</span>
          <span className="categoria">{producto.categoria}</span>
          <span className="stock">Stock: {producto.stock}</span>
        </div>
      </div>
      <div className="producto-acciones">
        <button onClick={() => onEditar(producto)} className="btn-editar">
          ✏️ Editar
        </button>
        <button onClick={handleEliminar} className="btn-eliminar">
          🗑️ Eliminar
        </button>
      </div>
    </div>
  );
});

export default ProductoItem;