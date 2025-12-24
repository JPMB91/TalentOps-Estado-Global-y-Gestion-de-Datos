import React, { memo } from 'react';

const Buscador = memo(({ busqueda, onBusquedaChange, categoriaFiltro, onCategoriaChange, categorias }) => {
  return (
    <div className="buscador">
      <div className="busqueda-input">
        <input
          type="text"
          placeholder="🔍 Buscar productos..."
          value={busqueda}
          onChange={(e) => onBusquedaChange(e.target.value)}
        />
      </div>
      
      <div className="filtro-categoria">
        <select 
          value={categoriaFiltro} 
          onChange={(e) => onCategoriaChange(e.target.value)}
        >
          <option value="">Todas las categorías</option>
          {categorias.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
    </div>
  );
});

export default Buscador;