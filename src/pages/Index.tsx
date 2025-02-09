
import { useState, useEffect } from "react";
import TabNavigation from "@/components/TabNavigation";
import ProductsTab from "@/components/ProductsTab";
import CartTab from "@/components/CartTab";
import ChangeTab from "@/components/ChangeTab";
import SettingsTab from "@/components/SettingsTab";
import { Product, CartItem, Settings } from "@/types/types";
import { getProducts, saveProducts, getCart, saveCart, getSettings, saveSettings, updateSalesStatistics } from "@/utils/localStorage";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [settings, setSettings] = useState<Settings>(getSettings());
  const isMobile = useIsMobile();

  useEffect(() => {
    setProducts(getProducts());
    setCart(getCart());
    setSettings(getSettings());
  }, []);

  const handleAddToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    let newCart: CartItem[];

    if (existingItem) {
      newCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(newCart);
    saveCart(newCart);
  };

  const handleUpdateQuantity = (id: string, change: number) => {
    const newCart = cart.map((item) => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    });
    setCart(newCart);
    saveCart(newCart);
  };

  const handleRemoveItem = (id: string) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
    saveCart(newCart);
  };

  const handleClearCart = () => {
    setCart([]);
    saveCart([]);
  };

  const handleReturnDeposit = () => {
    const depositId = "deposit-return";
    const existingDepositReturn = cart.find(item => item.id === depositId);
    const depositProduct: Product = {
      id: depositId,
      name: "Pfandrückgabe",
      price: -settings.defaultDeposit,
      deposit: 0
    };

    let newCart: CartItem[];
    if (existingDepositReturn) {
      newCart = cart.map(item =>
        item.id === depositId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [...cart, { ...depositProduct, quantity: 1 }];
    }
    
    // Update cart
    setCart(newCart);
    saveCart(newCart);
    
    // Update statistics for the deposit return
    updateSalesStatistics([{ ...depositProduct, quantity: 1 }], true);
    setSettings(getSettings());
  };

  const handleCheckout = () => {
    setActiveTab("cart");
  };

  const handleUpdateProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    saveProducts(newProducts);
  };

  const handleUpdateSettings = (newSettings: Settings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const handleCompleteOrder = () => {
    updateSalesStatistics(cart);
    handleClearCart();
    setActiveTab("products");
    setSettings(getSettings());
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity + (item.deposit || 0) * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-background">
      <div className={`container ${isMobile ? 'px-2 py-4' : 'py-6'} space-y-6`}>
        <h1 className="text-xl md:text-2xl font-bold text-center text-primary">Wechselgeld-Rechner</h1>
        
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="py-4">
          {activeTab === "products" && (
            <ProductsTab 
              products={products} 
              onAddToCart={handleAddToCart}
              onCheckout={handleCheckout}
              onReturnDeposit={handleReturnDeposit}
            />
          )}
          {activeTab === "cart" && (
            <CartTab
              items={cart}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onClearCart={handleClearCart}
              onReturnDeposit={handleReturnDeposit}
              onCheckout={() => setActiveTab("change")}
            />
          )}
          {activeTab === "change" && (
            <ChangeTab 
              total={totalAmount} 
              onCompleteOrder={handleCompleteOrder}
            />
          )}
          {activeTab === "settings" && (
            <SettingsTab
              products={products}
              settings={settings}
              onUpdateProducts={handleUpdateProducts}
              onUpdateSettings={handleUpdateSettings}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
