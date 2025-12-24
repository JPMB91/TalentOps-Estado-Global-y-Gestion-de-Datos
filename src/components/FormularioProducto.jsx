import { useState, useEffect } from 'react';
import { useProductos } from '../context/productContext';

const FormularioProducto = ({ productoEditar, onCancelar }) => {
  const { crearProducto, actualizarProducto } = useProductos();
  
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    categoria: '',
    stock: '',
    descripcion: ''
  });

  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (productoEditar) {
      setFormData(productoEditar);
    }
  }, [productoEditar]);

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es requerido';
    }

    if (!formData.precio || parseFloat(formData.precio) <= 0) {
      nuevosErrores.precio = 'El precio debe ser mayor a 0';
    }

    if (!formData.categoria.trim()) {
      nuevosErrores.categoria = 'La categoría es requerida';
    }

    if (!formData.stock || parseInt(formData.stock) < 0) {
      nuevosErrores.stock = 'El stock no puede ser negativo';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // limpiar error al escribir
    if (errores[name]) {
      setErrores(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    try {
      const productoData = {
        ...formData,
        precio: parseFloat(formData.precio),
        stock: parseInt(formData.stock)
      };

      if (productoEditar) {
        await actualizarProducto(productoEditar.id, productoData);
      } else {
        await crearProducto(productoData);
      }

      setFormData({
        nombre: '',
        precio: '',
        categoria: '',
        stock: '',
        descripcion: ''
      });
      
      if (onCancelar) onCancelar();
    } catch (error) {
      console.error('Error al guardar producto:', error);
    }
  };

  const handleCancelar = () => {
    setFormData({
      nombre: '',
      precio: '',
      categoria: '',
      stock: '',
      descripcion: ''
    });
    setErrores({});
    if (onCancelar) onCancelar();
  };

  return (
    <form onSubmit={handleSubmit} className="formulario-producto">
      <h2>{productoEditar ? 'Editar Producto' : 'Nuevo Producto'}</h2>

      <div className="form-group">
        <label>Nombre *</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Ej: Laptop Dell XPS"
        />
        {errores.nombre && <span className="error">{errores.nombre}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Precio *</label>
          <input
            type="number"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
          />
          {errores.precio && <span className="error">{errores.precio}</span>}
        </div>

        <div className="form-group">
          <label>Stock *</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="0"
          />
          {errores.stock && <span className="error">{errores.stock}</span>}
        </div>
      </div>

      <div className="form-group">
        <label>Categoría *</label>
        <input
          type="text"
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
          placeholder="Ej: Electrónica"
        />
        {errores.categoria && <span className="error">{errores.categoria}</span>}
      </div>

      <div className="form-group">
        <label>Descripción</label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          placeholder="Descripción del producto..."
          rows="3"
        />
      </div>

      <div className="form-acciones">
        <button type="submit" className="btn-guardar">
          {productoEditar ? '💾 Actualizar' : '➕ Crear Producto'}
        </button>
        {productoEditar && (
          <button type="button" onClick={handleCancelar} className="btn-cancelar">
            ❌ Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default FormularioProducto;