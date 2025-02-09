
import { useEffect, useState } from "react";
import { CurrencyUnit } from "@/types/types";
import { CURRENCY_UNITS, formatPrice, calculateChange } from "@/utils/money";
import { useIsMobile } from "@/hooks/use-mobile";
import { CheckCircle } from "lucide-react";

interface ChangeTabProps {
  total: number;
  onCompleteOrder: () => void;
}

const ChangeTab = ({ total, onCompleteOrder }: ChangeTabProps) => {
  const [paid, setPaid] = useState(0);
  const [change, setChange] = useState<CurrencyUnit[]>([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    setChange(calculateChange(paid, total));
  }, [paid, total]);

  const handleAddPayment = (amount: number) => {
    setPaid((prev) => Number((prev + amount).toFixed(2)));
  };

  const handleReset = () => {
    setPaid(0);
    setChange([]);
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-fadeIn">
      <div className="p-3 md:p-4 rounded-lg bg-muted space-y-2">
        <div className="flex justify-between text-sm md:text-base">
          <span>Zu zahlen:</span>
          <span className="font-bold">{formatPrice(total)}</span>
        </div>
        <div className="flex justify-between text-sm md:text-base">
          <span>Gegeben:</span>
          <span className="font-bold">{formatPrice(paid)}</span>
        </div>
        <div className="flex justify-between pt-2 border-t text-sm md:text-base">
          <span>Rückgeld:</span>
          <span className="font-bold">
            {paid >= total ? formatPrice(paid - total) : "Nicht ausreichend"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
        {CURRENCY_UNITS.map((unit) => (
          <button
            key={unit.label}
            onClick={() => handleAddPayment(unit.value)}
            className={`p-3 md:p-4 rounded-lg text-center transition-all hover:scale-105 text-sm md:text-base ${
              unit.type === "bill"
                ? "bg-money-bill text-gray-800"
                : "bg-money-coin text-gray-800"
            }`}
          >
            {unit.label}
          </button>
        ))}
      </div>

      {change.length > 0 && (
        <div className="p-3 md:p-4 rounded-lg bg-card space-y-2">
          <h3 className="font-medium text-sm md:text-base mb-3 md:mb-4">Rückgeld-Stückelung:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {change.map((unit, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg text-center text-xs md:text-sm ${
                  unit.type === "bill"
                    ? "bg-money-bill/50"
                    : "bg-money-coin/50"
                }`}
              >
                {unit.label}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <button
          onClick={onCompleteOrder}
          className={`flex items-center gap-2 ${
            isMobile ? 'w-full justify-center' : ''
          } px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity text-sm md:text-base`}
        >
          <CheckCircle className="w-5 h-5" />
          <span>Bestellung abschließen</span>
        </button>
        <button
          onClick={handleReset}
          className={`${
            isMobile ? 'w-full' : ''
          } px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:opacity-90 transition-opacity text-sm md:text-base`}
        >
          Zurücksetzen
        </button>
      </div>
    </div>
  );
};

export default ChangeTab;
