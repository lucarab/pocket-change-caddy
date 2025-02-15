
import { Product, CartItem, Settings, SalesStatistics } from '../types/types';

const PRODUCTS_KEY = 'products';
const CART_KEY = 'cart';
const SETTINGS_KEY = 'settings';

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

export const getSettings = (): Settings => {
  const settings = localStorage.getItem(SETTINGS_KEY);
  if (settings) {
    const parsedSettings = JSON.parse(settings);
    // Ensure salesStatistics exists
    if (!parsedSettings.salesStatistics) {
      parsedSettings.salesStatistics = getDefaultSalesStatistics();
    }
    return parsedSettings;
  }
  return getDefaultSettings();
};

export const saveSettings = (settings: Settings) => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};

const getDefaultProducts = (): Product[] => [
  { id: '1', name: 'Bier', price: 2.50, deposit: 2.00 },
  { id: '2', name: 'Schnaps', price: 4, deposit: 2.00 },
  { id: '3', name: 'Narrenbecher', price: 6, deposit: 0.00 },
  { id: '4', name: 'Flasche Sekt', price: 20, deposit: 2.00 },
  { id: '5', name: 'Alkoholfrei', price: 1.50, deposit: 2.00 },
];

const getDefaultSalesStatistics = (): SalesStatistics => ({
  totalRevenue: 0,
  totalDepositsCollected: 0,
  totalDepositsReturned: 0,
  productSales: [],
});

const getDefaultSettings = (): Settings => ({
  defaultDeposit: 2.00,
  salesStatistics: getDefaultSalesStatistics(),
});

export const updateSalesStatistics = (cart: CartItem[]) => {
  const settings = getSettings();
  const { salesStatistics } = settings;

  cart.forEach((item) => {
    // Check if this is a deposit return item
    if (item.id === 'deposit-return') {
      // Only update the deposit returns, not revenue
      salesStatistics.totalDepositsReturned += Math.abs(item.price * item.quantity);
    } else {
      // Regular sale
      const revenue = item.price * item.quantity;
      const depositCollected = (item.deposit || 0) * item.quantity;

      salesStatistics.totalRevenue += revenue;
      salesStatistics.totalDepositsCollected += depositCollected;

      const existingProductSale = salesStatistics.productSales.find(
        (sale) => sale.productId === item.id
      );

      if (existingProductSale) {
        existingProductSale.quantity += item.quantity;
        existingProductSale.revenue += revenue;
        existingProductSale.depositCollected += depositCollected;
      } else {
        salesStatistics.productSales.push({
          productId: item.id,
          productName: item.name,
          quantity: item.quantity,
          revenue: revenue,
          depositCollected: depositCollected,
        });
      }
    }
  });

  saveSettings(settings);
};
