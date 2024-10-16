import { useState, useEffect } from 'react';

const OrderList = ({ orders, onUpdateOrder, onDeleteOrder }) => {
  const [editingOrderId, setEditingOrderId] = useState(null); // Controla qué orden se está editando
  const [updatedOrder, setUpdatedOrder] = useState({}); // Estado para los datos editados de la orden
  const [products, setProducts] = useState([]); // Para cargar los productos disponibles

  // Cargar productos desde el backend para usarlos en el formulario de edición
  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleEditClick = (order) => {
    setEditingOrderId(order.id);
    setUpdatedOrder(order); // Llenar el formulario con los datos actuales de la orden
  };

  const handleCancelEdit = () => {
    setEditingOrderId(null); // Cancelar la edición
    setUpdatedOrder({});
  };

  const handleSaveEdit = () => {
    onUpdateOrder(updatedOrder); // Llamar a la función pasada por props para actualizar la orden
    setEditingOrderId(null); // Finalizar la edición
  };

  const handleInputChange = (e) => {
    setUpdatedOrder({
      ...updatedOrder,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {orders.map((order) => (
        <div key={order.id} className="p-3 border rounded-lg">
          {editingOrderId === order.id ? (
            <div>
              <input
                type="text"
                name="customerName"
                value={updatedOrder.customerName}
                onChange={handleInputChange}
                className="border p-2 w-full mb-2"
                placeholder="Customer Name"
              />
              <input
                type="date"
                name="orderDate"
                value={updatedOrder.orderDate}
                onChange={handleInputChange}
                className="border p-2 w-full mb-2"
              />
              <select
                name="productId"
                value={updatedOrder.productId}
                onChange={handleInputChange}
                className="border p-2 w-full mb-2"
              >
                <option value="">Select Product</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
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
              <h2 className="text-xl font-bold">Order #{order.id}</h2>
              <p><b>Date:</b> {order.orderDate}</p>
              <p><b>Customer:</b> {order.customerName}</p>
              <p><b>Product:</b> {order.product.name}</p>
              <p><b>Description:</b> {order.product.description}</p>
              <p className='mb-3'><b>Price:</b> ${order.product.price}</p>
              <button
                className="bg-blue-500 text-white p-2 mr-2 rounded"
                onClick={() => handleEditClick(order)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white p-2 rounded"
                onClick={() => onDeleteOrder(order.id)}
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

export default OrderList;
