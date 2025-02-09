
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
