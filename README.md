# Sistema de Gestión de Productos

Sistema completo de gestión de productos construido con React, implementando hooks avanzados, Context API, y sistema de caché inteligente.

## 🚀 Características

-  **CRUD Completo**: Crear, Leer, Actualizar y Eliminar productos
-  **Estado Global**: Implementado con Context API y useReducer
-  **Sistema de Caché**: Cache en memoria + localStorage con TTL de 5 minutos
-  **Búsqueda y Filtros**: Filtrar productos por nombre, descripción y categoría
-  **Validación**: Validación de formularios en el frontend
-  **Optimización**: Uso de useMemo y React.memo para prevenir re-renders innecesarios

## 📋 Prerequisitos

- Node.js (v14 o superior)
- npm o yarn

##  Instalación

1. **Clonar el repositorio**
```bash
git clone <tu-repositorio>
cd gestion-estado
```

2. **Instalar dependencias**
```bash
npm install
```

##  Ejecución


```bash
npm run dev
```
Esto iniciará:
- React en `http://localhost:3000`
- JSON Server en `http://localhost:3001`




##  Funcionalidades Principales

### 1. Context API + useReducer
Gestión centralizada del estado de productos con acciones tipo Redux:
- `CARGAR_PRODUCTOS_INICIO/EXITO/ERROR`
- `CREAR_PRODUCTO_EXITO`
- `ACTUALIZAR_PRODUCTO_EXITO`
- `ELIMINAR_PRODUCTO_EXITO`

### 2. Sistema de Caché
- **Cache en memoria**: Para acceso ultrarrápido durante la sesión
- **localStorage**: Persistencia entre recargas
- **TTL inteligente**: 5 minutos de validez
- **Invalidación automática**: Se limpia al crear/editar/eliminar

### 3. Optimización con Memoización
```javascript
// Categorías únicas memoizadas
const categorias = useMemo(() => {
  return [...new Set(productos.map(p => p.categoria))];
}, [productos]);

// Filtrado optimizado
const productosFiltrados = useMemo(() => {
  return productos.filter(producto => 
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );
}, [productos, busqueda]);
```

##  Modelo de Datos

### Producto
```json
{
  "id": 1,
  "nombre": "Laptop Dell XPS 13",
  "precio": 1299.99,
  "categoria": "Electrónica",
  "stock": 15,
  "descripcion": "Laptop ultrabook de alto rendimiento"
}
```

##  Tecnologías Utilizadas

- **React** - Librería UI
- **Context API** - Gestión de estado global
- **useReducer** - Manejo de estado complejo
- **Axios** - Peticiones HTTP
- **JSON Server** - API REST mock
- **localStorage** - Persistencia de datos
- **useMemo / useCallback** - Optimización de renders

