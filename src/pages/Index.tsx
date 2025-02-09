
import { useState, useEffect } from "react";
import TabNavigation from "@/components/TabNavigation";
import ProductsTab from "@/components/ProductsTab";
import CartTab from "@/components/CartTab";
import ChangeTab from "@/components/ChangeTab";
import SettingsTab from "@/components/SettingsTab";
import { Product, CartItem } from "@/types/types";
import { getProducts, saveProducts, getCart, saveCart } from "@/utils/localStorage";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setProducts(getProducts());
    setCart(getCart());
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
    toast({
      title: "Produkt hinzugefügt",
      description: `${product.name} wurde in den Warenkorb gelegt.`,
    });
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
    toast({
      title: "Warenkorb geleert",
      description: "Alle Produkte wurden aus dem Warenkorb entfernt.",
    });
  };

  const handleReturnDeposit = () => {
    const bottleCount = prompt("Anzahl der zurückgegebenen Flaschen:");
    if (bottleCount === null) return;

    const count = parseInt(bottleCount);
    if (isNaN(count) || count < 1) {
      toast({
        title: "Ungültige Eingabe",
        description: "Bitte geben Sie eine gültige Anzahl ein.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Pfand zurückgegeben",
      description: `${count} Flaschen wurden zurückgegeben.`,
    });
  };

  const handleCheckout = () => {
    setActiveTab("change");
  };

  const handleUpdateProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    saveProducts(newProducts);
    toast({
      title: "Produkte aktualisiert",
      description: "Die Produktliste wurde erfolgreich aktualisiert.",
    });
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity + (item.deposit || 0) * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">Wechselgeld-Rechner</h1>
        
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="py-4">
          {activeTab === "products" && (
            <ProductsTab products={products} onAddToCart={handleAddToCart} />
          )}
          {activeTab === "cart" && (
            <CartTab
              items={cart}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onClearCart={handleClearCart}
              onReturnDeposit={handleReturnDeposit}
              onCheckout={handleCheckout}
            />
          )}
          {activeTab === "change" && <ChangeTab total={totalAmount} />}
          {activeTab === "settings" && (
            <SettingsTab
              products={products}
              onUpdateProducts={handleUpdateProducts}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
