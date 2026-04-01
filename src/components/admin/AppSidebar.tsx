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
    <aside className="hidden lg:flex fixed left-0 top-0 z-40 h-screen w-64 bg-[#1d1714]/95 text-foreground border-r border-[rgba(236,229,217,0.12)] flex-col shadow-[20px_0_40px_-30px_rgba(0,0,0,0.35)] backdrop-blur-sm">
      <div className="h-16 flex items-center px-6 border-b border-[rgba(236,229,217,0.08)]">
        <div className="flex items-center gap-2 font-semibold text-lg tracking-tight">
          <div className="size-9 rounded-xl bg-gradient-to-br from-[#c3986b] to-[#b1835f] text-[#0f0a07] flex items-center justify-center shadow-[0_12px_30px_-14px_rgba(0,0,0,0.6)]">
            <span className="font-bold">D</span>
          </div>
          <span className="text-foreground">DevBio Admin</span>
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
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-[#c3986b] text-[#0f0a07] shadow-[0_14px_30px_-18px_rgba(0,0,0,0.6)]"
                  : "text-foreground/70 hover:bg-[rgba(255,255,255,0.06)] hover:text-foreground"
              )}
            >
              <item.icon className="size-4" strokeWidth={1.75} />
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="p-3 mt-auto space-y-1 border-t border-[rgba(236,229,217,0.08)]">
        {bottomItems.map((item) => (
          <Link 
            key={item.href} 
            to={item.href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/70 hover:bg-[rgba(255,255,255,0.06)] hover:text-foreground transition-colors"
          >
            <item.icon className="size-4" strokeWidth={1.75} />
            {item.label}
          </Link>
        ))}
        
        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/70 hover:bg-red-500/10 hover:text-red-400 transition-colors mt-2"
        >
          <LogOut className="size-4" strokeWidth={1.75} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
