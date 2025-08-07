import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import StatsCard from "@/components/dashboard/stats-card";
import ExpenseTrendsChart from "@/components/dashboard/expense-trends-chart";
import CategoryBreakdown from "@/components/dashboard/category-breakdown";
import RecentTransactions from "@/components/dashboard/recent-transactions";
import FloatingActionButton from "@/components/expenses/floating-action-button";
import { isUnauthorizedError } from "@/lib/authUtils";

export default function Home() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  if (isLoading || !isAuthenticated) {
    return <div className="min-h-screen bg-surface flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>;
  }

  return (
    <div className="flex h-screen bg-surface">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Dashboard" subtitle="Track your expenses and manage your budget" />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Quick Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard
                title="This Month"
                value="$2,847.50"
                icon="arrow-up"
                trend="+12.5%"
                trendText="from last month"
                trendColor="error"
                bgColor="red"
              />
              <StatsCard
                title="Budget Remaining"
                value="$1,152.50"
                icon="piggy-bank"
                trend="28.8%"
                trendText="of monthly budget"
                trendColor="secondary"
                bgColor="green"
              />
              <StatsCard
                title="Total Categories"
                value="8"
                icon="tags"
                trendText="Active expense categories"
                bgColor="blue"
              />
              <StatsCard
                title="Avg. Daily"
                value="$94.92"
                icon="calendar-day"
                trendText="Based on 30 days"
                bgColor="orange"
              />
            </div>

            {/* Charts and Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <ExpenseTrendsChart />
              </div>
              <CategoryBreakdown />
            </div>

            {/* Recent Transactions */}
            <RecentTransactions />
          </div>
        </main>
      </div>

      <FloatingActionButton />
    </div>
  );
}
