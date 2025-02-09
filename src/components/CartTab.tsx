
import { Plus, Minus, Trash } from "lucide-react";
import { CartItem } from "@/types/types";
import { formatPrice } from "@/utils/money";
import { useIsMobile } from "@/hooks/use-mobile";

interface CartTabProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, change: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onReturnDeposit: () => void;
  onCheckout: () => void;
}

const CartTab = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onReturnDeposit,
  onCheckout,
}: CartTabProps) => {
  const isMobile = useIsMobile();
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity + (item.deposit || 0) * item.quantity,
    0
  );

  const depositTotal = items.reduce(
    (sum, item) => sum + (item.deposit || 0) * item.quantity,
    0
  );

  return (
    <div className="space-y-3 md:space-y-4 animate-fadeIn">
      {items.length === 0 ? (
        <div className="text-center py-6 md:py-8 text-muted-foreground">
          Ihr Warenkorb ist leer
        </div>
      ) : (
        <>
          <div className="space-y-3 md:space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 md:p-4 rounded-lg bg-card shadow-sm"
              >
                <div className="flex-1">
                  <h3 className="text-sm md:text-base font-medium">{item.name}</h3>
                  <div className="text-xs md:text-sm text-muted-foreground">
                    {formatPrice(item.price)}
                    {item.deposit ? ` + ${formatPrice(item.deposit)} Pfand` : ''}
                  </div>
                </div>
                <div className="flex items-center space-x-2 md:space-x-4">
                  <div className="flex items-center space-x-1 md:space-x-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="p-1 rounded-md hover:bg-muted"
                    >
                      <Minus className="w-3 h-3 md:w-4 md:h-4" />
                    </button>
                    <span className="w-6 md:w-8 text-center text-sm md:text-base">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="p-1 rounded-md hover:bg-muted"
                    >
                      <Plus className="w-3 h-3 md:w-4 md:h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-1 text-destructive hover:bg-destructive/10 rounded-md"
                  >
                    <Trash className="w-3 h-3 md:w-4 md:h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 md:p-4 rounded-lg bg-muted space-y-2">
            <div className="flex justify-between text-xs md:text-sm">
              <span>Zwischensumme:</span>
              <span>{formatPrice(total - depositTotal)}</span>
            </div>
            <div className="flex justify-between text-xs md:text-sm">
              <span>Pfand:</span>
              <span>{formatPrice(depositTotal)}</span>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t text-sm md:text-base">
              <span>Gesamt:</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <button
              onClick={onReturnDeposit}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:opacity-90 transition-opacity text-sm md:text-base"
            >
              Pfand zurückgeben
            </button>
            <button
              onClick={onClearCart}
              className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:opacity-90 transition-opacity text-sm md:text-base"
            >
              Warenkorb leeren
            </button>
            <button
              onClick={onCheckout}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity text-sm md:text-base"
            >
              Zur Kasse
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartTab;
