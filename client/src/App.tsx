import { Router, Route, Switch } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import Analytics from './pages/Analytics';
import Categories from './pages/Categories';
import Navbar from './components/Navbar';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background">
        <Router>
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Switch>
              <Route path="/" component={Dashboard} />
              <Route path="/expenses" component={Expenses} />
              <Route path="/analytics" component={Analytics} />
              <Route path="/categories" component={Categories} />
              <Route>
                <div className="text-center py-16">
                  <h1 className="text-2xl font-bold text-gray-800">Page Not Found</h1>
                  <p className="text-gray-600 mt-2">The page you're looking for doesn't exist.</p>
                </div>
              </Route>
            </Switch>
          </main>
        </Router>
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;