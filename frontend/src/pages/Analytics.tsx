import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

async function fetchCategoryAnalytics() {
  const response = await fetch('/api/analytics/by-category');
  if (!response.ok) {
    throw new Error('Failed to fetch category analytics');
  }
  return response.json();
}

async function fetchExpenses() {
  const response = await fetch('/api/expenses');
  if (!response.ok) {
    throw new Error('Failed to fetch expenses');
  }
  return response.json();
}

export default function Analytics() {
  const { data: categoryData, isLoading: categoryLoading } = useQuery({
    queryKey: ['/api/analytics/by-category'],
    queryFn: fetchCategoryAnalytics,
  });

  const { data: expenses, isLoading: expensesLoading } = useQuery({
    queryKey: ['/api/expenses'],
    queryFn: fetchExpenses,
  });

  if (categoryLoading || expensesLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const totalAmount = expenses?.reduce((sum: number, expense: any) => sum + parseFloat(expense.amount), 0) || 0;
  const averageExpense = expenses?.length ? totalAmount / expenses.length : 0;
  const highestExpense = expenses?.reduce((max: any, expense: any) => 
    parseFloat(expense.amount) > parseFloat(max?.amount || '0') ? expense : max, null);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${totalAmount.toFixed(2)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Average Expense</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${averageExpense.toFixed(2)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{expenses?.length || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Highest Expense</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              ${highestExpense ? parseFloat(highestExpense.amount).toFixed(2) : '0.00'}
            </p>
            {highestExpense && (
              <p className="text-xs text-gray-500 mt-1">{highestExpense.title}</p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Expenses by Category</CardTitle>
          </CardHeader>
          <CardContent>
            {categoryData && categoryData.length > 0 ? (
              <div className="space-y-4">
                {categoryData.map((item: any, index: number) => {
                  const percentage = totalAmount > 0 ? (parseFloat(item.total) / totalAmount) * 100 : 0;
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{item.category}</span>
                        <span className="text-sm text-gray-500">
                          ${parseFloat(item.total).toFixed(2)} ({percentage.toFixed(1)}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500">{item.count} transactions</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No data available</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {expenses && expenses.length > 0 ? (
              <div className="space-y-4">
                {expenses.slice(0, 10).map((expense: any) => (
                  <div key={expense.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                    <div>
                      <p className="font-medium">{expense.title}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(expense.date).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="font-bold">${parseFloat(expense.amount).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No transactions yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}