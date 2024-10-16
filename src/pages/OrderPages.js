import { useState, useEffect } from 'react';
import OrderList from '../components/OrderList';
import AddOrder from '../components/AddOrder';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  // Función para cargar las órdenes desde el backend
  const loadOrders = () => {
    fetch('http://localhost:3000/api/orders')
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error('Error fetching orders:', error));
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // Función para agregar una nueva orden
  const addOrder = async (order) => {
    await fetch('http://localhost:3000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });
    loadOrders(); // Recargar la lista de órdenes después de agregar una nueva
  };

  // Función para actualizar una orden existente
  const updateOrder = async (updatedOrder) => {
    await fetch(`http://localhost:3000/api/orders/${updatedOrder.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedOrder),
    });
    loadOrders(); // Recargar la lista después de la actualización
  };

  // Función para eliminar una orden
  const deleteOrder = async (orderId) => {
    await fetch(`http://localhost:3000/api/orders/${orderId}`, {
      method: 'DELETE',
    });
    loadOrders(); // Recargar la lista después de eliminar
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Order Management</h1>
      <AddOrder onAddOrder={addOrder} />
      <OrderList
        orders={orders}
        onUpdateOrder={updateOrder}
        onDeleteOrder={deleteOrder}
      />
    </div>
  );
};

export default OrderPage;
