
import { Plus, CreditCard } from "lucide-react";
import { Product } from "@/types/types";
import { formatPrice } from "@/utils/money";

interface ProductsTabProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onCheckout: () => void;
}

const ProductsTab = ({ products, onAddToCart, onCheckout }: ProductsTabProps) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-4 rounded-lg bg-card shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-medium">{product.name}</h3>
              <span className="text-lg font-bold">{formatPrice(product.price)}</span>
            </div>
            {product.deposit && (
              <p className="text-sm text-muted-foreground mb-4">
                Pfand: {formatPrice(product.deposit)}
              </p>
            )}
            <button
              onClick={() => onAddToCart(product)}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" />
              <span>Zum Warenkorb</span>
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <button
          onClick={onCheckout}
          className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          <CreditCard className="w-5 h-5" />
          <span>Bezahlen</span>
        </button>
      </div>
    </div>
  );
};

export default ProductsTab;
