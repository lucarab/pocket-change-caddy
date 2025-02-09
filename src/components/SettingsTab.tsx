
import { useState } from "react";
import { Plus, Trash } from "lucide-react";
import { Product, Settings } from "@/types/types";
import { formatPrice } from "@/utils/money";

interface SettingsTabProps {
  products: Product[];
  settings: Settings;
  onUpdateProducts: (products: Product[]) => void;
  onUpdateSettings: (settings: Settings) => void;
}

const SettingsTab = ({ products, settings, onUpdateProducts, onUpdateSettings }: SettingsTabProps) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    deposit: "",
  });

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) return;

    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name,
      price: Number(newProduct.price),
      deposit: newProduct.deposit ? Number(newProduct.deposit) : undefined,
    };

    onUpdateProducts([...products, product]);
    setNewProduct({ name: "", price: "", deposit: "" });
  };

  const handleRemoveProduct = (id: string) => {
    onUpdateProducts(products.filter((p) => p.id !== id));
  };

  const handleDefaultDepositChange = (value: string) => {
    onUpdateSettings({
      ...settings,
      defaultDeposit: Number(value),
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="p-4 rounded-lg bg-card space-y-4">
        <h3 className="font-medium">Standard Pfand</h3>
        <input
          type="number"
          placeholder="Standard Pfand (€)"
          value={settings.defaultDeposit}
          onChange={(e) => handleDefaultDepositChange(e.target.value)}
          className="w-full p-2 rounded-md border"
          step="0.01"
        />
      </div>

      <div className="p-4 rounded-lg bg-card space-y-4">
        <h3 className="font-medium">Neues Produkt hinzufügen</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Produktname"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="w-full p-2 rounded-md border"
          />
          <input
            type="number"
            placeholder="Preis (€)"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            className="w-full p-2 rounded-md border"
            step="0.01"
          />
          <input
            type="number"
            placeholder="Pfand (€, optional)"
            value={newProduct.deposit}
            onChange={(e) => setNewProduct({ ...newProduct, deposit: e.target.value })}
            className="w-full p-2 rounded-md border"
            step="0.01"
          />
          <button
            onClick={handleAddProduct}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            <span>Produkt hinzufügen</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Produkte verwalten</h3>
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between p-4 rounded-lg bg-card"
          >
            <div>
              <h4 className="font-medium">{product.name}</h4>
              <div className="text-sm text-muted-foreground">
                {formatPrice(product.price)}
                {product.deposit && ` + ${formatPrice(product.deposit)} Pfand`}
              </div>
            </div>
            <button
              onClick={() => handleRemoveProduct(product.id)}
              className="p-2 text-destructive hover:bg-destructive/10 rounded-md"
            >
              <Trash className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsTab;
