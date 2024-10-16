import { useState, useEffect } from 'react';

const AddOrder = ({ onAddOrder }) => {
  const [customerName, setCustomerName] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [productId, setProductId] = useState('');
  const [products, setProducts] = useState([]);

  // Cargar productos desde el backend para mostrarlos en el select
  useEffect(() => {
    fetch('http://localhost:3000/api/products')  // Reemplaza con tu API backend de productos
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrder = { customerName, orderDate, productId };
    onAddOrder(newOrder);

    // Limpiar el formulario después de enviar
    setCustomerName('');
    setOrderDate('');
    setProductId('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <input
        type="text"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        placeholder="Customer Name"
        className="border p-2 w-full"
      />
      <input
        type="date"
        value={orderDate}
        onChange={(e) => setOrderDate(e.target.value)}
        className="border p-2 w-full"
      />
      <select
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        className="border p-2 w-full"
      >
        <option value="">Select Product</option>
        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name}
          </option>
        ))}
      </select>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Order
      </button>
    </form>
  );
};

export default AddOrder;
