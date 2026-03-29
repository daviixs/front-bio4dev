import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  User, 
  BarChart2, 
  Settings, 
  HelpCircle, 
  MessageSquare,
  LogOut
} from "lucide-react";
import { cn } from "@/components/ui/utils";
import { useAuthStore } from "@/stores/authStore";

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: User, label: "Bio", href: "/dashboard/bio" },
    { icon: BarChart2, label: "Analytics", href: "/dashboard/analytics" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ];

  const bottomItems = [
    { icon: HelpCircle, label: "Help", href: "/dashboard/help" },
    { icon: MessageSquare, label: "Feedback", href: "/dashboard/feedback" },
  ];

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex-col transition-transform">
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border/10">
        <div className="flex items-center gap-2 font-semibold text-lg tracking-tight">
          <div className="size-8 rounded bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold">D</span>
          </div>
          <span>DevBio Admin</span>
        </div>
      </div>

      <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.href || (item.href !== "/dashboard" && location.pathname.startsWith(item.href));
          return (
            <Link 
              key={item.href} 
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="p-3 mt-auto space-y-1 border-t border-sidebar-border/10">
        {bottomItems.map((item) => (
          <Link 
            key={item.href} 
            to={item.href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          >
            <item.icon className="size-4" />
            {item.label}
          </Link>
        ))}
        
        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:bg-red-500/10 hover:text-red-500 transition-colors mt-2"
        >
          <LogOut className="size-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
