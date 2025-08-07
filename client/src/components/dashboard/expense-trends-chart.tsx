import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    Chart: any;
  }
}

export default function ExpenseTrendsChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    // Load Chart.js if not already loaded
    if (!window.Chart) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
      script.onload = () => {
        initChart();
      };
      document.head.appendChild(script);
    } else {
      initChart();
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const initChart = () => {
    if (!canvasRef.current || !window.Chart) return;

    // Destroy existing chart if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    chartRef.current = new window.Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Nov 8', 'Nov 9', 'Nov 10', 'Nov 11', 'Nov 12', 'Nov 13', 'Nov 14', 'Nov 15'],
        datasets: [{
          label: 'Daily Expenses',
          data: [45, 78, 92, 156, 89, 67, 123, 94],
          borderColor: 'hsl(207, 90%, 41%)',
          backgroundColor: 'hsla(207, 90%, 41%, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            },
            ticks: {
              callback: function(value: any) {
                return '$' + value;
              }
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  };

  return (
    <Card className="shadow-material-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium text-foreground">Expense Trends</CardTitle>
          <div className="flex space-x-2">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">7D</Button>
            <Button size="sm" variant="ghost" className="text-muted-foreground hover:bg-muted">30D</Button>
            <Button size="sm" variant="ghost" className="text-muted-foreground hover:bg-muted">6M</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <canvas ref={canvasRef} className="w-full h-full"></canvas>
        </div>
      </CardContent>
    </Card>
  );
}
