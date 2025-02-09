
import { useEffect, useState } from "react";
import { CurrencyUnit } from "@/types/types";
import { CURRENCY_UNITS, formatPrice, calculateChange } from "@/utils/money";

interface ChangeTabProps {
  total: number;
}

const ChangeTab = ({ total }: ChangeTabProps) => {
  const [paid, setPaid] = useState(0);
  const [change, setChange] = useState<CurrencyUnit[]>([]);

  useEffect(() => {
    setChange(calculateChange(paid, total));
  }, [paid, total]);

  const handleAddPayment = (amount: number) => {
    setPaid((prev) => Number((prev + amount).toFixed(2)));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="p-4 rounded-lg bg-muted space-y-2">
        <div className="flex justify-between">
          <span>Zu zahlen:</span>
          <span className="font-bold">{formatPrice(total)}</span>
        </div>
        <div className="flex justify-between">
          <span>Gegeben:</span>
          <span className="font-bold">{formatPrice(paid)}</span>
        </div>
        <div className="flex justify-between pt-2 border-t">
          <span>Rückgeld:</span>
          <span className="font-bold">
            {paid >= total ? formatPrice(paid - total) : "Nicht ausreichend"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {CURRENCY_UNITS.map((unit) => (
          <button
            key={unit.label}
            onClick={() => handleAddPayment(unit.value)}
            className={`p-4 rounded-lg text-center transition-all hover:scale-105 ${
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
        <div className="p-4 rounded-lg bg-card space-y-2">
          <h3 className="font-medium mb-4">Rückgeld-Stückelung:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {change.map((unit, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg text-center ${
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

      <button
        onClick={() => setPaid(0)}
        className="w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:opacity-90 transition-opacity"
      >
        Zurücksetzen
      </button>
    </div>
  );
};

export default ChangeTab;
