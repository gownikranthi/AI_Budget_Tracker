import { Link, useLocation } from "wouter";
import { Wallet, Home, Receipt, PiggyBank, BarChart3, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Expenses", href: "/expenses", icon: Receipt },
  { name: "Budgets", href: "/budgets", icon: PiggyBank },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="w-64 bg-card shadow-material-2 hidden lg:block">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Wallet className="text-primary-foreground text-lg" />
          </div>
          <div>
            <h1 className="text-xl font-medium text-foreground">ExpenseTracker</h1>
            <p className="text-sm text-muted-foreground">Personal Finance</p>
          </div>
        </div>
      </div>
      
      <nav className="mt-6">
        <div className="px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = location === item.href;
              const Icon = item.icon;
              
              return (
                <Link key={item.name} href={item.href}>
                  <div
                    className={cn(
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer",
                      isActive
                        ? "bg-primary/10 border-r-2 border-primary text-primary rounded-l-md"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon className={cn("mr-3 h-5 w-5", isActive ? "text-primary" : "text-muted-foreground")} />
                    {item.name}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </aside>
  );
}
