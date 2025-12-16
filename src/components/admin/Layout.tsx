import { AppSidebar } from "./AppSidebar";
import { MobileHeader } from "./MobileHeader";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground flex overflow-x-hidden">
      <AppSidebar />
      <MobileHeader />
      <main className="flex-1 lg:ml-64 min-h-screen overflow-y-auto overflow-x-hidden transition-all duration-300 ease-in-out pt-16 lg:pt-0">
        <div className="container mx-auto max-w-7xl p-4 sm:p-6 md:p-8 lg:p-10 animate-in fade-in duration-500">
          {children}
        </div>
      </main>
    </div>
  );
}
