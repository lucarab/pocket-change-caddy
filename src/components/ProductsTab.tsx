
import { Plus, CreditCard, ArrowDown, ShoppingCart } from "lucide-react";
import { Product } from "@/types/types";
import { formatPrice } from "@/utils/money";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProductsTabProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onCheckout: () => void;
  onReturnDeposit: () => void;
}

const ProductsTab = ({ products, onAddToCart, onCheckout, onReturnDeposit }: ProductsTabProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-base md:text-lg font-medium text-gray-800">{product.name}</h3>
              <span className="text-base md:text-lg font-bold text-primary">{formatPrice(product.price)}</span>
            </div>
            {product.deposit && (
              <p className="text-xs md:text-sm text-muted-foreground mb-4">
                Pfand: {formatPrice(product.deposit)}
              </p>
            )}
            <button
              onClick={() => onAddToCart(product)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary/90 text-primary-foreground rounded-md hover:bg-primary transition-colors active:scale-95 transition-transform text-sm md:text-base font-medium"
            >
              <Plus className="w-4 h-4" />
              <span>Zum Warenkorb</span>
            </button>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <button
          onClick={onCheckout}
          className={`flex items-center gap-2 ${
            isMobile ? 'w-full justify-center' : ''
          } px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 active:scale-95 transition-all text-sm md:text-base font-medium shadow-sm`}
        >
          <ShoppingCart className="w-5 h-5" />
          <span>Zum Warenkorb</span>
        </button>
        <button
          onClick={onReturnDeposit}
          className={`flex items-center gap-2 ${
            isMobile ? 'w-full justify-center' : ''
          } px-6 py-3 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 active:scale-95 transition-all text-sm md:text-base font-medium shadow-sm`}
        >
          <ArrowDown className="w-5 h-5" />
          <span>Pfand zurückgeben</span>
        </button>
      </div>
    </div>
  );
};

export default ProductsTab;
