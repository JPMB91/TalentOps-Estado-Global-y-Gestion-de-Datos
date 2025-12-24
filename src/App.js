import "./App.css";
import ListaProductos from "./components/ListarProductos";
import { ProductosContextProvider } from "./context/productContext";

function App() {
  return (
    <ProductosContextProvider>
      <div className="App">
        <header>
            <h1>Sistema de Gestión de Productos</h1>
        </header>
      <ListaProductos/>
      </div>
    </ProductosContextProvider>
  );
}

export default App;
