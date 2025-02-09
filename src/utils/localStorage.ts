
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
  return settings ? JSON.parse(settings) : getDefaultSettings();
};

export const saveSettings = (settings: Settings) => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};

const getDefaultProducts = (): Product[] => [
  { id: '1', name: 'Bier', price: 3.50, deposit: 2.00 },
  { id: '2', name: 'Cola', price: 2.50, deposit: 0.25 },
  { id: '3', name: 'Wasser', price: 1.50, deposit: 0.25 },
];

const getDefaultSettings = (): Settings => ({
  defaultDeposit: 0.25,
  salesStatistics: {
    totalRevenue: 0,
    totalDepositsCollected: 0,
    totalDepositsReturned: 0,
    productSales: [],
  },
});

export const updateSalesStatistics = (cart: CartItem[], isDeposit: boolean = false) => {
  const settings = getSettings();
  const { salesStatistics } = settings;

  if (isDeposit) {
    // Handle deposit return
    const depositAmount = cart.reduce((total, item) => {
      return total + (item.deposit || 0) * item.quantity;
    }, 0);
    salesStatistics.totalDepositsReturned += depositAmount;
  } else {
    // Handle regular sale
    cart.forEach((item) => {
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
    });
  }

  saveSettings(settings);
};
