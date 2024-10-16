import { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import AddProduct from '../components/AddProduct';

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  // Función para cargar los productos desde el backend
  const loadProducts = () => {
    fetch('http://localhost:3000/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Función para agregar un nuevo producto
  const addProduct = async (product) => {
    await fetch('http://localhost:3000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    loadProducts(); // Recargar la lista de productos después de agregar uno nuevo
  };

  // Función para actualizar un producto existente
  const updateProduct = async (updatedProduct) => {
    await fetch(`http://localhost:3000/api/products/${updatedProduct.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct),
    });
    loadProducts(); // Recargar la lista después de la actualización
  };

  // Función para eliminar un producto
  const deleteProduct = async (productId) => {
    await fetch(`http://localhost:3000/api/products/${productId}`, {
      method: 'DELETE',
    });
    loadProducts(); // Recargar la lista después de eliminar
  };

  return (
    <div className='p-5'>
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>
      <AddProduct onAddProduct={addProduct} />
      <ProductList
        products={products}
        onUpdateProduct={updateProduct}
        onDeleteProduct={deleteProduct}
      />
    </div>
  );
};

export default ProductPage;
