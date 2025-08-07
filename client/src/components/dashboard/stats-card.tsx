import { ArrowUp, PiggyBank, Tags, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string;
  icon: "arrow-up" | "piggy-bank" | "tags" | "calendar-day";
  trend?: string;
  trendText?: string;
  trendColor?: "error" | "secondary" | "muted";
  bgColor: "red" | "green" | "blue" | "orange";
}

const iconMap = {
  "arrow-up": ArrowUp,
  "piggy-bank": PiggyBank,
  "tags": Tags,
  "calendar-day": Calendar,
};

const bgColorMap = {
  red: "bg-red-100",
  green: "bg-green-100", 
  blue: "bg-blue-100",
  orange: "bg-orange-100",
};

const iconColorMap = {
  red: "text-red-600",
  green: "text-green-600",
  blue: "text-blue-600", 
  orange: "text-orange-600",
};

const trendColorMap = {
  error: "text-destructive",
  secondary: "text-secondary",
  muted: "text-muted-foreground",
};

export default function StatsCard({ 
  title, 
  value, 
  icon, 
  trend, 
  trendText, 
  trendColor = "muted",
  bgColor 
}: StatsCardProps) {
  const Icon = iconMap[icon];
  
  return (
    <Card className="shadow-material-1">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
          </div>
          <div className={`h-12 w-12 ${bgColorMap[bgColor]} rounded-lg flex items-center justify-center`}>
            <Icon className={`${iconColorMap[bgColor]} text-xl`} />
          </div>
        </div>
        {(trend || trendText) && (
          <div className="mt-4 flex items-center">
            {trend && (
              <span className={`text-sm font-medium ${trendColorMap[trendColor]}`}>
                {trend}
              </span>
            )}
            {trendText && (
              <span className={`text-sm ml-1 ${trend ? 'text-muted-foreground' : trendColorMap[trendColor]}`}>
                {trendText}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
