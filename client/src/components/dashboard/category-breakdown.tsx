import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const categories = [
  { name: "Food & Dining", amount: "$847.50", percentage: "29.8%", color: "bg-blue-500" },
  { name: "Transportation", amount: "$524.20", percentage: "18.4%", color: "bg-green-500" },
  { name: "Entertainment", amount: "$425.80", percentage: "15.0%", color: "bg-yellow-500" },
  { name: "Shopping", amount: "$385.60", percentage: "13.5%", color: "bg-purple-500" },
  { name: "Utilities", amount: "$310.40", percentage: "10.9%", color: "bg-red-500" },
];

export default function CategoryBreakdown() {
  return (
    <Card className="shadow-material-1">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-foreground">Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categories.map((category, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 ${category.color} rounded-full`}></div>
                <span className="text-sm font-medium text-foreground">{category.name}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{category.amount}</p>
                <p className="text-xs text-muted-foreground">{category.percentage}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-border">
          <Button variant="ghost" className="w-full text-center text-sm text-primary hover:text-primary/80 font-medium">
            View All Categories
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
