
export interface Product {
  id: string;
  name: string;
  price: number;
  deposit?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CurrencyUnit {
  value: number;
  label: string;
  type: 'bill' | 'coin';
}

export interface ProductSales {
  productId: string;
  productName: string;
  quantity: number;
  revenue: number;
  depositCollected: number;
}

export interface SalesStatistics {
  totalRevenue: number;
  totalDepositsCollected: number;
  totalDepositsReturned: number;
  productSales: ProductSales[];
}

export interface Settings {
  defaultDeposit: number;
  salesStatistics: SalesStatistics;
}
