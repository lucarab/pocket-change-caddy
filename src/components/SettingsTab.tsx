
import { useState } from "react";
import { Plus, Trash, EuroIcon, ArrowDown, ShoppingCart } from "lucide-react";
import { Product, Settings } from "@/types/types";
import { useIsMobile } from "@/hooks/use-mobile";
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
  const isMobile = useIsMobile();

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

  const handleUpdateProduct = (id: string, field: 'price' | 'deposit', value: string) => {
    const newProducts = products.map(product => {
      if (product.id === id) {
        return {
          ...product,
          [field]: value ? Number(value) : field === 'deposit' ? undefined : 0
        };
      }
      return product;
    });
    onUpdateProducts(newProducts);
  };

  const handleDefaultDepositChange = (value: string) => {
    onUpdateSettings({
      ...settings,
      defaultDeposit: Number(value),
    });
  };

  const handleResetStatistics = () => {
    onUpdateSettings({
      ...settings,
      salesStatistics: {
        totalRevenue: 0,
        totalDepositsCollected: 0,
        totalDepositsReturned: 0,
        productSales: [],
      },
    });
  };

  const { salesStatistics } = settings;

  return (
    <div className="space-y-2 md:space-y-2 animate-fadeIn">
      <div className="p-3 md:p-4 rounded-lg bg-card space-y-1 md:space-y-1">
        <h3 className="font-medium text-sm md:text-base">Verkaufsstatistiken</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-muted">
            <div className="flex items-center gap-2 text-primary mb-2">
              <EuroIcon className="w-4 h-4" />
              <span className="font-medium">Gesamtumsatz (ohne Pfand)</span>
            </div>
            <span className="text-lg font-bold">{formatPrice(salesStatistics.totalRevenue)}</span>
          </div>
          
          <div className="p-4 rounded-lg bg-muted">
            <div className="flex items-center gap-2 text-primary mb-2">
              <ShoppingCart className="w-4 h-4" />
              <span className="font-medium">Pfand eingenommen</span>
            </div>
            <span className="text-lg font-bold">{formatPrice(salesStatistics.totalDepositsCollected)}</span>
          </div>
          
          <div className="p-4 rounded-lg bg-muted">
            <div className="flex items-center gap-2 text-primary mb-2">
              <ArrowDown className="w-4 h-4" />
              <span className="font-medium">Pfand zurückgegeben</span>
            </div>
            <span className="text-lg font-bold">{formatPrice(salesStatistics.totalDepositsReturned)}</span>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <h4 className="font-medium text-sm md:text-base">Verkaufte Produkte</h4>
          <div className="space-y-2">
            {salesStatistics.productSales.map((sale) => (
              <div key={sale.productId} className="p-3 rounded-lg bg-muted">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{sale.productName}</span>
                  <span className="text-sm">{sale.quantity}x verkauft</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleResetStatistics}
          className="w-full px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:opacity-90 transition-opacity text-sm md:text-base"
        >
          Statistiken zurücksetzen
        </button>
      </div>

      <hr></hr>

      <div className="p-3 md:p-4 rounded-lg bg-card space-y-3 md:space-y-4">
        <h3 className="font-medium text-sm md:text-base">Standard Pfand</h3>
        <input
          type="number"
          placeholder="Standard Pfand (€)"
          value={settings.defaultDeposit}
          onChange={(e) => handleDefaultDepositChange(e.target.value)}
          className="w-full p-2 rounded-md border text-sm md:text-base"
          step="0.01"
        />
      </div>

      <hr></hr>

      <div className="p-3 md:p-4 rounded-lg bg-card space-y-3 md:space-y-4">
        <h3 className="font-medium text-sm md:text-base">Neues Produkt hinzufügen</h3>
        <div className="space-y-3 md:space-y-4">
          <input
            type="text"
            placeholder="Produktname"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="w-full p-2 rounded-md border text-sm md:text-base"
          />
          <input
            type="number"
            placeholder="Preis (€)"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            className="w-full p-2 rounded-md border text-sm md:text-base"
            step="0.01"
          />
          <input
            type="number"
            placeholder="Pfand (€, optional)"
            value={newProduct.deposit}
            onChange={(e) => setNewProduct({ ...newProduct, deposit: e.target.value })}
            className="w-full p-2 rounded-md border text-sm md:text-base"
            step="0.01"
          />
          <button
            onClick={handleAddProduct}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity text-sm md:text-base"
          >
            <Plus className="w-4 h-4" />
            <span>Produkt hinzufügen</span>
          </button>
        </div>
      </div>

      <hr></hr>

      <div className="p-3 md:p-4 rounded-lg bg-card space-y-3 md:space-y-4">
        <h3 className="font-medium text-sm md:text-base">Produkte verwalten</h3>
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between p-3 md:p-4 rounded-lg bg-card"
          >
            <div className="flex-1 space-y-2">
              <h4 className="font-medium text-sm md:text-base">{product.name}</h4>
              <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'space-x-2'}`}>
                <input
                  type="number"
                  value={product.price}
                  onChange={(e) => handleUpdateProduct(product.id, 'price', e.target.value)}
                  className="w-full md:w-24 p-2 text-xs md:text-sm rounded-md border"
                  step="0.01"
                  placeholder="Preis"
                />
                <input
                  type="number"
                  value={product.deposit || ''}
                  onChange={(e) => handleUpdateProduct(product.id, 'deposit', e.target.value)}
                  className="w-full md:w-24 p-2 text-xs md:text-sm rounded-md border"
                  step="0.01"
                  placeholder="Pfand"
                />
              </div>
            </div>
            <button
              onClick={() => handleRemoveProduct(product.id)}
              className="p-2 text-destructive hover:bg-destructive/10 rounded-md ml-2"
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

