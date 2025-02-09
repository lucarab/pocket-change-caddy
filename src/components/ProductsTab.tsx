
import { Plus, CreditCard } from "lucide-react";
import { Product } from "@/types/types";
import { formatPrice } from "@/utils/money";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProductsTabProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onCheckout: () => void;
}

const ProductsTab = ({ products, onAddToCart, onCheckout }: ProductsTabProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-4 md:space-y-6 animate-fadeIn">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-3 md:p-4 rounded-lg bg-card shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-base md:text-lg font-medium">{product.name}</h3>
              <span className="text-base md:text-lg font-bold">{formatPrice(product.price)}</span>
            </div>
            {product.deposit && (
              <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
                Pfand: {formatPrice(product.deposit)}
              </p>
            )}
            <button
              onClick={() => onAddToCart(product)}
              className="w-full flex items-center justify-center space-x-2 px-3 md:px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity text-sm md:text-base"
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
          className={`flex items-center space-x-2 ${
            isMobile ? 'w-full justify-center' : ''
          } px-4 md:px-6 py-2 md:py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm md:text-base`}
        >
          <CreditCard className="w-4 h-4 md:w-5 md:h-5" />
          <span>Bezahlen</span>
        </button>
      </div>
    </div>
  );
};

export default ProductsTab;
