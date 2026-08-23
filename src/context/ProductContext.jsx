import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { PRODUCTS as INITIAL_PRODUCTS } from '../data/products';
import { useToast } from './ToastContext';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useLocalStorage('basket_boost_products_catalog_v2', INITIAL_PRODUCTS);
  const { addToast } = useToast();

  // Add a new product
  const addProduct = (newProductData) => {
    const id = Date.now();
    const discount = newProductData.originalPrice && newProductData.originalPrice > newProductData.price
      ? Math.round(((newProductData.originalPrice - newProductData.price) / newProductData.originalPrice) * 100)
      : 0;

    const product = {
      id,
      rating: 5.0,
      reviews: 1,
      inStock: true,
      featured: false,
      isNew: true,
      tags: [newProductData.category.toLowerCase(), newProductData.brand.toLowerCase()],
      ...newProductData,
      discount
    };

    setProducts(prev => [product, ...prev]);
    addToast(`Product "${product.name}" created successfully!`, 'success');
    return product;
  };

  // Update existing product
  const updateProduct = (id, updatedFields) => {
    const discount = updatedFields.originalPrice && updatedFields.originalPrice > updatedFields.price
      ? Math.round(((updatedFields.originalPrice - updatedFields.price) / updatedFields.originalPrice) * 100)
      : 0;

    setProducts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, ...updatedFields, discount } : p
      )
    );
    addToast('Product details updated successfully!', 'success');
  };

  // Delete product
  const deleteProduct = (id) => {
    const target = products.find(p => p.id === id);
    setProducts(prev => prev.filter(p => p.id !== id));
    addToast(`Product "${target?.name || id}" removed from store`, 'info');
  };

  // Reset to default catalog
  const resetToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    addToast('Reset product catalog to default inventory', 'info');
  };

  return (
    <ProductContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      resetToDefault
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
