import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown, Users, Eye, MousePointer2, Clock } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const accessData = [
  { name: "Jan", visits: 1000, unique: 800 },
  { name: "Feb", visits: 1500, unique: 1200 },
  { name: "Mar", visits: 1200, unique: 950 },
  { name: "Apr", visits: 2500, unique: 2000 },
  { name: "May", visits: 3200, unique: 2600 },
  { name: "Jun", visits: 4560, unique: 3800 },
  { name: "Jul", visits: 4200, unique: 3500 },
];

const deviceData = [
  { name: "Desktop", value: 65 },
  { name: "Mobile", value: 30 },
  { name: "Tablet", value: 5 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Analytics</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">Detailed insights into your portfolio performance.</p>
        </div>

        {/* Metrics Overview */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Visits
              </CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18,560</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-emerald-600 font-medium inline-flex items-center">
                  <ArrowUp className="mr-1 h-3 w-3" />
                  +24%
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Unique Visitors
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">14,200</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-emerald-600 font-medium inline-flex items-center">
                  <ArrowUp className="mr-1 h-3 w-3" />
                  +18%
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Avg. Session Duration
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3m 24s</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-emerald-600 font-medium inline-flex items-center">
                  <ArrowUp className="mr-1 h-3 w-3" />
                  +12%
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Bounce Rate
              </CardTitle>
              <MousePointer2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42%</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-rose-500 font-medium inline-flex items-center">
                  <ArrowDown className="mr-1 h-3 w-3" />
                  -5%
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Visits Over Time</CardTitle>
            </CardHeader>
            <CardContent className="pl-0 sm:pl-2">
              <div className="h-[250px] sm:h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={accessData}>
                    <defs>
                      <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="name" 
                      stroke="#888888" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <YAxis 
                      stroke="#888888" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--popover))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: 'var(--radius)'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="visits" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorVisits)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="unique" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      fillOpacity={0} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Device Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="pl-0 sm:pl-2">
              <div className="h-[250px] sm:h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={deviceData}>
                    <XAxis 
                      dataKey="name" 
                      stroke="#888888" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <YAxis 
                      stroke="#888888" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--popover))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: 'var(--radius)'
                      }}
                    />
                    <Bar 
                      dataKey="value" 
                      fill="hsl(var(--primary))" 
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  );
}
