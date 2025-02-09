
import { Product, CartItem } from '../types/types';

const PRODUCTS_KEY = 'products';
const CART_KEY = 'cart';

export const getProducts = (): Product[] => {
  const products = localStorage.getItem(PRODUCTS_KEY);
  return products ? JSON.parse(products) : getDefaultProducts();
};

export const saveProducts = (products: Product[]) => {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
};

export const getCart = (): CartItem[] => {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart: CartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

const getDefaultProducts = (): Product[] => [
  { id: '1', name: 'Bier', price: 3.50, deposit: 2.00 },
  { id: '2', name: 'Cola', price: 2.50, deposit: 0.25 },
  { id: '3', name: 'Wasser', price: 1.50, deposit: 0.25 },
];
