
import { cn } from "@/lib/utils";
import { Package, ShoppingCart, Settings, Banknote } from "lucide-react";

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  const tabs = [
    { id: "products", label: "Produkte", icon: Package },
    { id: "cart", label: "Warenkorb", icon: ShoppingCart },
    { id: "change", label: "Wechselgeld", icon: Banknote },
    { id: "settings", label: "Einstellungen", icon: Settings },
  ];

  return (
    <div className="flex space-x-1 rounded-lg bg-muted p-1">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex-1 px-3 py-2.5 flex flex-col items-center justify-center gap-1 rounded-md transition-all duration-200",
              activeTab === tab.id
                ? "bg-background text-primary shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
            )}
            title={tab.label}
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        )}
      )}
    </div>
  );
};

export default TabNavigation;

