import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/components/ui/utils";
import {
  LayoutDashboard,
  User,
  BarChart2,
  Settings,
  HelpCircle,
  MessageSquare,
  LogOut,
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";

export function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);
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

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Header Bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 bg-[#1d1714]/95 border-b border-[rgba(236,229,217,0.08)] backdrop-blur-sm flex items-center justify-between px-4">
        <div className="flex items-center gap-2 font-semibold text-lg tracking-tight">
          <div className="size-9 rounded-xl bg-gradient-to-br from-[#c3986b] to-[#b1835f] text-[#0f0a07] flex items-center justify-center shadow-[0_12px_30px_-18px_rgba(0,0,0,0.6)]">
            <span className="font-bold">D</span>
          </div>
          <span className="text-foreground">DevBio Admin</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMenu}
          className="text-foreground hover:bg-[rgba(255,255,255,0.08)]"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={closeMenu}
            aria-hidden="true"
          />
          <aside
            className={cn(
              "lg:hidden fixed top-0 left-0 z-50 h-full w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col transition-transform duration-300 ease-in-out",
              isOpen ? "translate-x-0" : "-translate-x-full"
            )}
          >
            {/* Mobile Menu Header */}
            <div className="h-16 flex items-center justify-between px-6 border-b border-sidebar-border/10">
              <div className="flex items-center gap-2 font-semibold text-lg tracking-tight">
                <div className="size-9 rounded-xl bg-gradient-to-br from-[#c3986b] to-[#b1835f] text-[#0f0a07] flex items-center justify-center shadow-[0_12px_30px_-18px_rgba(0,0,0,0.6)]">
                  <span className="font-bold">D</span>
                </div>
                <span>DevBio Admin</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeMenu}
                className="text-foreground hover:bg-[rgba(255,255,255,0.08)]"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Mobile Menu Items */}
            <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
              {menuItems.map((item) => {
                const isActive =
                  location.pathname === item.href ||
                  (item.href !== "/dashboard" &&
                    location.pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={closeMenu}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
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

            {/* Mobile Menu Footer */}
            <div className="p-3 mt-auto space-y-1 border-t border-sidebar-border/10">
              {bottomItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={closeMenu}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/70 hover:bg-[rgba(255,255,255,0.06)] hover:text-foreground transition-colors"
              >
                <item.icon className="size-4" strokeWidth={1.75} />
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => {
                closeMenu();
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
        </>
      )}
    </>
  );
}
