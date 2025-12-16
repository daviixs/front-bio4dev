import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown, ExternalLink, Globe, FileText, MousePointer2 } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { cn } from "@/components/ui/utils";

const data = [
  { name: "Jan", visits: 1000 },
  { name: "Feb", visits: 1500 },
  { name: "Mar", visits: 1200 },
  { name: "Apr", visits: 2500 },
  { name: "May", visits: 3200 },
  { name: "Jun", visits: 4560 },
  { name: "Jul", visits: 4200 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6 sm:space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">Overview of your portfolio performance.</p>
        </div>

        {/* Metrics Overview */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Accesses
              </CardTitle>
              <MousePointer2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4,560</div>
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
                Published Bios
              </CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground mt-1">
                Active portfolios
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Templates Used
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground mt-1">
                Modern & Minimalist
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Avg. Session
              </CardTitle>
              <div className="h-4 w-4 text-muted-foreground font-bold text-xs">min</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2m 45s</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-rose-500 font-medium inline-flex items-center">
                  <ArrowDown className="mr-1 h-3 w-3" />
                  -2%
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Section */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-7">
          <Card className="lg:col-span-4 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Access Analytics</CardTitle>
            </CardHeader>
            <CardContent className="pl-0 sm:pl-2">
              <div className="h-[250px] sm:h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
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
                      tickFormatter={(value) => `${value}`} 
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
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-3 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Most Accessed Pages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 sm:space-y-6">
                {[
                  { name: "/portfolio/main", visits: 2450, trend: "+12%" },
                  { name: "/blog/react-hooks", visits: 1200, trend: "+5%" },
                  { name: "/about-me", visits: 850, trend: "-2%" },
                  { name: "/projects/saas", visits: 600, trend: "+18%" },
                  { name: "/contact", visits: 450, trend: "+0%" },
                ].map((page, i) => (
                  <div key={i} className="flex items-center justify-between group">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none group-hover:text-primary transition-colors cursor-pointer flex items-center gap-1">
                        {page.name}
                        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </p>
                      <p className="text-xs text-muted-foreground">{page.visits} accesses</p>
                    </div>
                    <div className={cn("text-xs font-medium", 
                      page.trend.startsWith("+") ? "text-emerald-600" : "text-rose-500"
                    )}>
                      {page.trend}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  );
}
