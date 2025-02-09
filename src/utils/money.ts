
import { CurrencyUnit } from '../types/types';

export const CURRENCY_UNITS: CurrencyUnit[] = [
  { value: 100, label: '100€', type: 'bill' },
  { value: 50, label: '50€', type: 'bill' },
  { value: 20, label: '20€', type: 'bill' },
  { value: 10, label: '10€', type: 'bill' },
  { value: 5, label: '5€', type: 'bill' },
  { value: 2, label: '2€', type: 'coin' },
  { value: 1, label: '1€', type: 'coin' },
  { value: 0.5, label: '50¢', type: 'coin' },
  { value: 0.2, label: '20¢', type: 'coin' },
  { value: 0.1, label: '10¢', type: 'coin' },
  { value: 0.05, label: '5¢', type: 'coin' },
  { value: 0.02, label: '2¢', type: 'coin' },
  { value: 0.01, label: '1¢', type: 'coin' },
];

export const formatPrice = (price: number): string => {
  return price.toFixed(2) + '€';
};

export const calculateChange = (paid: number, total: number): CurrencyUnit[] => {
  let change = paid - total;
  const result: CurrencyUnit[] = [];
  
  if (change <= 0) return result;

  for (const unit of CURRENCY_UNITS) {
    while (change >= unit.value) {
      result.push(unit);
      change = Number((change - unit.value).toFixed(2));
    }
  }

  return result;
};
