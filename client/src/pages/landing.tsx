import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, PieChart, TrendingUp, Shield } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <Wallet className="text-primary-foreground text-2xl" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">ExpenseTracker</h1>
          </div>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Take control of your finances with our comprehensive personal expense tracking solution. 
            Monitor spending, set budgets, and achieve your financial goals.
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 py-3"
            onClick={() => window.location.href = "/api/login"}
          >
            Get Started
          </Button>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="shadow-material-1">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="w-6 h-6 text-primary" />
                <span>Smart Analytics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Get detailed insights into your spending patterns with interactive charts and category breakdowns.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="shadow-material-1">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-6 h-6 text-secondary" />
                <span>Budget Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Set monthly budgets for different categories and track your progress with real-time alerts.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="shadow-material-1">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-6 h-6 text-accent" />
                <span>Secure & Private</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Your financial data is encrypted and securely stored. Only you have access to your information.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to transform your financial habits?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of users who have taken control of their finances.
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 py-3"
            onClick={() => window.location.href = "/api/login"}
          >
            Start Tracking Today
          </Button>
        </div>
      </div>
    </div>
  );
}
