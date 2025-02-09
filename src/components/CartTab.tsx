
import { Plus, Minus, Trash } from "lucide-react";
import { CartItem } from "@/types/types";
import { formatPrice } from "@/utils/money";

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
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity + (item.deposit || 0) * item.quantity,
    0
  );

  const depositTotal = items.reduce(
    (sum, item) => sum + (item.deposit || 0) * item.quantity,
    0
  );

  return (
    <div className="space-y-4 animate-fadeIn">
      {items.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          Ihr Warenkorb ist leer
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 rounded-lg bg-card shadow-sm"
              >
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <div className="text-sm text-muted-foreground">
                    {formatPrice(item.price)}
                    {item.deposit && ` + ${formatPrice(item.deposit)} Pfand`}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="p-1 rounded-md hover:bg-muted"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="p-1 rounded-md hover:bg-muted"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-1 text-destructive hover:bg-destructive/10 rounded-md"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-lg bg-muted space-y-2">
            <div className="flex justify-between text-sm">
              <span>Zwischensumme:</span>
              <span>{formatPrice(total - depositTotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Pfand:</span>
              <span>{formatPrice(depositTotal)}</span>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t">
              <span>Gesamt:</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <button
              onClick={onReturnDeposit}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:opacity-90 transition-opacity"
            >
              Pfand zurückgeben
            </button>
            <button
              onClick={onClearCart}
              className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:opacity-90 transition-opacity"
            >
              Warenkorb leeren
            </button>
            <button
              onClick={onCheckout}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
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
