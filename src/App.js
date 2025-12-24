import "./App.css";
import { ProductosContextProvider } from "./context/productContext";

function App() {
  return (
    <ProductosContextProvider>
      <div>
        <h1>Sistema de Gestión de Productos</h1>
      </div>
    </ProductosContextProvider>
  );
}

export default App;
