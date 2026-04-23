import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import {
  Home,
  SignupPage,
  UserTypeSelectionPage,
  CreateProfilePage,
  DeveloperCreateProfilePage,
  DeveloperDraftEditorPage,
  SetupWizardPage,
  InfluencerOnboardingPage,
  AdminDashboard,
  BioPage,
  BioEditPage,
  AnalyticsPage,
  AdminSettingsPage,
  PublicProfilePage,
  PortfolioEditorPage,
  AuthCallbackPage,
} from './pages';
import { AdminLayoutWrapper } from './components/admin/AdminLayoutWrapper';
import { AppToaster } from '@/components/ui/sonner';
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'sonner';

const AUTH_SESSION_TOAST_ID = 'auth-session-expired';

function ProtectedRouteFallback() {
  return (
    <div className="min-h-screen bg-[#120f0d] flex items-center justify-center px-6">
      <div className="rounded-3xl border border-[rgba(236,229,217,0.12)] bg-[#1d1714]/95 px-6 py-5 text-center text-[#ece5d9] shadow-[0_24px_60px_-36px_rgba(0,0,0,0.75)] backdrop-blur">
        Restaurando sua sessão...
      </div>
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const authStatus = useAuthStore((state) => state.authStatus);
  const authRedirectMessage = useAuthStore(
    (state) => state.authRedirectMessage,
  );
  const bootstrapAuth = useAuthStore((state) => state.bootstrapAuth);
  const consumeAuthRedirectMessage = useAuthStore(
    (state) => state.consumeAuthRedirectMessage,
  );

  useEffect(() => {
    if (!hasHydrated) return;
    if (authStatus !== 'booting') return;

    void bootstrapAuth();
  }, [authStatus, bootstrapAuth, hasHydrated]);

  useEffect(() => {
    if (authStatus !== 'guest' || !authRedirectMessage) return;

    const message = consumeAuthRedirectMessage();
    if (!message) return;

    toast.error(message, { id: AUTH_SESSION_TOAST_ID });
  }, [authStatus, authRedirectMessage, consumeAuthRedirectMessage]);

  if (!hasHydrated) {
    return <ProtectedRouteFallback />;
  }

  if (authStatus === 'booting') {
    return <ProtectedRouteFallback />;
  }

  if (authStatus === 'guest') {
    return <Navigate to="/profile/type" replace />;
  }

  return <>{children}</>;
}

function AuthSessionBootstrap() {
  const location = useLocation();
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const authStatus = useAuthStore((state) => state.authStatus);
  const bootstrapAuth = useAuthStore((state) => state.bootstrapAuth);

  useEffect(() => {
    if (!hasHydrated) return;
    if (location.pathname === '/auth/callback/google') return;
    if (authStatus !== 'booting') return;

    void bootstrapAuth();
  }, [authStatus, bootstrapAuth, hasHydrated, location.pathname]);

  return null;
}

function AppShell({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isLanding = location.pathname === '/' || location.pathname === '/home';
  const isWorkspaceWithoutShell =
    location.pathname.startsWith('/onboarding/') ||
    location.pathname.startsWith('/dashboard/influencer/') ||
    location.pathname.startsWith('/dashboard/bio/');
  return (
    <div className={isLanding || isWorkspaceWithoutShell ? '' : 'app-shell'}>
      <AuthSessionBootstrap />
      {children}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          <Route
            path="/signup"
            element={<Navigate to="/profile/type" replace />}
          />
          <Route path="/auth/callback/google" element={<AuthCallbackPage />} />

          <Route path="/profile/type" element={<UserTypeSelectionPage />} />
          <Route path="/profile/create" element={<CreateProfilePage />} />
          <Route
            path="/profile/create/developer"
            element={<DeveloperCreateProfilePage />}
          />
          <Route
            path="/onboarding/developer/:draftId"
            element={<DeveloperDraftEditorPage />}
          />
          <Route
            path="/onboarding/:profileId"
            element={<InfluencerOnboardingPage />}
          />

          <Route
            path="/dashboard/portfolio/:portfolioId"
            element={
              <ProtectedRoute>
                <PortfolioEditorPage mode="edit" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/influencer/:templateId/:profileId/edit"
            element={
              <ProtectedRoute>
                <PortfolioEditorPage mode="edit" />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/influencer/:templateId/:profileId/preview"
            element={
              <ProtectedRoute>
                <PortfolioEditorPage mode="preview" />
              </ProtectedRoute>
            }
          />

          <Route
            path="/setup"
            element={
              <ProtectedRoute>
                <SetupWizardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/bio/:id"
            element={
              <ProtectedRoute>
                <BioEditPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AdminLayoutWrapper />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="bio" element={<BioPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>

          <Route
            path="/dashboard-old"
            element={<Navigate to="/dashboard" replace />}
          />

          <Route path="/portifolio-1/:slug" element={<PublicProfilePage />} />
          <Route path="/:slug" element={<PublicProfilePage />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppShell>
      <AppToaster />
    </BrowserRouter>
  );
}
