import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from './ToastContext';

const INITIAL_ORDERS = [
  {
    id: 'BB-982314',
    date: '2026-08-18T14:32:00.000Z',
    customer: {
      fullName: 'Rahul Sharma',
      phone: '9876543210',
      email: 'rahul.s@example.com',
      address: '402 Palm Heights, Linking Road',
      city: 'Mumbai',
      pincode: '400050'
    },
    items: [
      {
        id: 1,
        name: 'AeroTune Pro Wireless ANC Headphones',
        price: 3499,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
        category: 'Electronics'
      },
      {
        id: 23,
        name: 'HydroLock Insulated Stainless Steel Bottle 1L',
        price: 899,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80',
        category: 'Sports'
      }
    ],
    subtotal: 4398,
    deliveryFee: 0,
    discount: 0,
    total: 4398,
    paymentMethod: 'UPI',
    status: 'Shipped' // 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'
  },
  {
    id: 'BB-741289',
    date: '2026-08-16T11:15:00.000Z',
    customer: {
      fullName: 'Priya Patel',
      phone: '9822019944',
      email: 'priya.patel@example.com',
      address: '12 B Green Park',
      city: 'New Delhi',
      pincode: '110016'
    },
    items: [
      {
        id: 7,
        name: 'UrbanAura Minimalist Oversized Hoodie',
        price: 1699,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80',
        category: 'Fashion'
      }
    ],
    subtotal: 3398,
    deliveryFee: 0,
    discount: 340,
    total: 3058,
    paymentMethod: 'Credit Card',
    status: 'Delivered'
  }
];

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useLocalStorage('basket_boost_orders', INITIAL_ORDERS);
  const { addToast } = useToast();

  const addOrder = (orderPayload) => {
    const newOrder = {
      id: 'BB-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toISOString(),
      status: 'Processing',
      ...orderPayload
    };

    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    addToast(`Order ${orderId} marked as "${newStatus}"`, 'success');
  };

  const cancelOrder = (orderId) => {
    updateOrderStatus(orderId, 'Cancelled');
  };

  return (
    <OrderContext.Provider value={{
      orders,
      addOrder,
      updateOrderStatus,
      cancelOrder
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
