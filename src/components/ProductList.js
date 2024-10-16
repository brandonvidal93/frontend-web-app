import { useState } from 'react';

const ProductList = ({ products, onUpdateProduct, onDeleteProduct }) => {
  const [editingProductId, setEditingProductId] = useState(null); // Controla el producto que se está editando
  const [updatedProduct, setUpdatedProduct] = useState({}); // Estado para los datos editados del producto

  const handleEditClick = (product) => {
    setEditingProductId(product.id);
    setUpdatedProduct(product); // Llenar el formulario con los datos actuales del producto
  };

  const handleCancelEdit = () => {
    setEditingProductId(null); // Cancelar edición
    setUpdatedProduct({});
  };

  const handleSaveEdit = () => {
    onUpdateProduct(updatedProduct); // Llamar a la función pasada por props para actualizar el producto
    setEditingProductId(null); // Finalizar edición
  };

  const handleInputChange = (e) => {
    setUpdatedProduct({
      ...updatedProduct,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
      {products.map((product) => (
        <div key={product.id} className="p-3 border rounded-lg">
          {editingProductId === product.id ? (
            <div>
              <input
                type="text"
                name="name"
                value={updatedProduct.name}
                onChange={handleInputChange}
                className="border p-2 w-full mb-2"
              />
              <input
                type="text"
                name="description"
                value={updatedProduct.description}
                onChange={handleInputChange}
                className="border p-2 w-full mb-2"
              />
              <input
                type="number"
                name="price"
                value={updatedProduct.price}
                onChange={handleInputChange}
                className="border p-2 w-full mb-2"
              />
              <button
                className="bg-green-500 text-white p-2 mr-2 rounded"
                onClick={handleSaveEdit}
              >
                Save
              </button>
              <button
                className="bg-gray-500 text-white p-2 rounded"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-bold">{product.name}</h2>
              <p>{product.description}</p>
              <p className='mb-3'><b>Price:</b> ${product.price}</p>
              <button
                className="bg-blue-500 text-white p-2 mr-2 rounded"
                onClick={() => handleEditClick(product)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white p-2 rounded"
                onClick={() => onDeleteProduct(product.id)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
