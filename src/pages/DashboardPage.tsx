import React, { useEffect, useState } from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import {
  Code2,
  LayoutDashboard,
  User,
  Palette,
  Share2,
  Briefcase,
  FileText,
  Settings,
  LogOut,
  Eye,
  Copy,
  ExternalLink,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/authStore';
import { useProfileStore } from '@/stores/profileStore';
import { toast } from 'sonner';

const menuItems = [
  { path: '/dashboard', label: 'Visão Geral', icon: LayoutDashboard },
  { path: '/dashboard/profile', label: 'Informações', icon: User },
  { path: '/dashboard/appearance', label: 'Aparência', icon: Palette },
  { path: '/dashboard/socials', label: 'Redes Sociais', icon: Share2 },
  { path: '/dashboard/projects', label: 'Projetos', icon: Briefcase },
  { path: '/dashboard/pages', label: 'Páginas', icon: FileText },
  { path: '/dashboard/settings', label: 'Configurações', icon: Settings },
];

export function DashboardPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuthStore();
  const { profile, loadProfile } = useProfileStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const profileId = localStorage.getItem('bio4dev_profile_id');

  useEffect(() => {
    if (profileId) {
      loadProfile(profileId);
    }
  }, [profileId, loadProfile]);

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Até logo! 👋');
  };

  const copyLink = () => {
    if (profile?.username) {
      navigator.clipboard.writeText(`${window.location.origin}/${profile.username}`);
      toast.success('Link copiado!');
    }
  };

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl">
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
              <Code2 className="w-6 h-6 text-black" />
            </div>
            <span className="text-xl font-bold tracking-tight">Bio4Dev</span>
          </Link>
        </div>

        {/* Profile Preview */}
        {profile && (
          <div className="p-4 mx-4 mt-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center overflow-hidden">
                {profile.avatarUrl ? (
                  <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-5 h-5 text-white/50" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{profile.legenda?.nome || user?.nome}</p>
                <p className="text-xs text-emerald-400 truncate">@{profile.username}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={copyLink}
                className="flex-1 text-xs text-white/70 hover:text-white hover:bg-white/10"
              >
                <Copy className="w-3 h-3 mr-1" />
                Copiar Link
              </Button>
              <Link to={`/${profile.username}`} target="_blank">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-white/70 hover:text-white hover:bg-white/10"
                >
                  <Eye className="w-3 h-3" />
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  active
                    ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
                {active && <ChevronRight className="w-4 h-4 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <User className="w-5 h-5 text-white/50" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.nome}</p>
              <p className="text-xs text-white/50 truncate">{user?.email}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start text-white/60 hover:text-red-400 hover:bg-red-500/10"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sair
          </Button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
              <Code2 className="w-5 h-5 text-black" />
            </div>
            <span className="font-bold">Bio4Dev</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-white"
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isSidebarOpen && (
          <div className="border-t border-white/5 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    active
                      ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/10 text-emerald-400'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start text-white/60 hover:text-red-400 hover:bg-red-500/10"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Sair
            </Button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <main className="flex-1 lg:p-8 p-4 pt-20 lg:pt-8 overflow-auto">
        <div className="max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

// Dashboard Overview Component
export function DashboardOverview() {
  const { profile } = useProfileStore();
  const { user } = useAuthStore();

  const stats = [
    { label: 'Projetos', value: profile?.projetos?.length || 0, icon: Briefcase },
    { label: 'Redes Sociais', value: profile?.socials?.length || 0, icon: Share2 },
    { label: 'Páginas', value: profile?.pages?.length || 0, icon: FileText },
  ];

  const copyLink = () => {
    if (profile?.username) {
      navigator.clipboard.writeText(`${window.location.origin}/${profile.username}`);
      toast.success('Link copiado!');
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/10 rounded-2xl p-8 border border-emerald-500/20">
        <h1 className="text-3xl font-bold mb-2">
          Olá, {profile?.legenda?.nome || user?.nome}! 👋
        </h1>
        <p className="text-white/60 mb-6">
          Gerencie seu portfólio e acompanhe as estatísticas.
        </p>
        
        <div className="flex flex-wrap gap-4">
          {profile?.username && (
            <>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                <span className="text-white/50">Seu link:</span>
                <span className="text-emerald-400 font-mono">{window.location.origin}/{profile.username}</span>
              </div>
              <Button
                onClick={copyLink}
                variant="outline"
                className="border-white/10 text-white hover:bg-white/10"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copiar
              </Button>
              <Link to={`/${profile.username}`} target="_blank">
                <Button
                  variant="outline"
                  className="border-white/10 text-white hover:bg-white/10"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visualizar
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center text-emerald-400">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-white/50 text-sm">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Ações Rápidas</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Editar Informações', icon: User, path: '/dashboard/profile' },
            { label: 'Adicionar Projeto', icon: Briefcase, path: '/dashboard/projects' },
            { label: 'Gerenciar Redes', icon: Share2, path: '/dashboard/socials' },
            { label: 'Mudar Aparência', icon: Palette, path: '/dashboard/appearance' },
          ].map((action, i) => {
            const Icon = action.icon;
            return (
              <Link
                key={i}
                to={action.path}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:bg-white/10 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/50 group-hover:text-emerald-400 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">{action.label}</span>
                <ChevronRight className="w-4 h-4 ml-auto text-white/30 group-hover:text-emerald-400 transition-colors" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Profile Status */}
      {profile && (
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-3 h-3 rounded-full ${profile.published ? 'bg-emerald-500' : 'bg-yellow-500'}`} />
              <div>
                <p className="font-medium">
                  Status: {profile.published ? 'Publicado' : 'Rascunho'}
                </p>
                <p className="text-sm text-white/50">
                  {profile.published
                    ? 'Seu portfólio está visível para todos'
                    : 'Seu portfólio ainda não está público'}
                </p>
              </div>
            </div>
            <Link to="/dashboard/settings">
              <Button
                variant="outline"
                className="border-white/10 text-white hover:bg-white/10"
              >
                <Settings className="w-4 h-4 mr-2" />
                Configurar
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

