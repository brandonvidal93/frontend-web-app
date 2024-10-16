import './App.css';
import OrderPage from './pages/OrderPages';
import ProductPage from './pages/ProductsPages';


function App() {
  return (
    <div className="App">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
        <ProductPage />

        <OrderPage />
      </div>
    </div>
  );
}

export default App;
