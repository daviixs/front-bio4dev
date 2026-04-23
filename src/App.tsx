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

const logAuthRoute = (message: string, details?: Record<string, unknown>) => {
  if (!import.meta.env.DEV) return;
  console.log(`[auth][ProtectedRoute] ${message}`, details ?? {});
};

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const authStatus = useAuthStore((state) => state.authStatus);
  const accessToken = useAuthStore((state) => state.accessToken);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const authRedirectMessage = useAuthStore(
    (state) => state.authRedirectMessage,
  );
  const bootstrapAuth = useAuthStore((state) => state.bootstrapAuth);
  const consumeAuthRedirectMessage = useAuthStore(
    (state) => state.consumeAuthRedirectMessage,
  );

  useEffect(() => {
    logAuthRoute('state changed', {
      path: location.pathname,
      hasHydrated,
      authStatus,
      isAuthenticated,
      hasAccessToken: Boolean(accessToken),
      hasUser: Boolean(user),
      userId: user?.id ?? null,
    });
  }, [
    accessToken,
    authStatus,
    hasHydrated,
    isAuthenticated,
    location.pathname,
    user,
  ]);

  useEffect(() => {
    if (!hasHydrated) {
      logAuthRoute('waiting for persisted auth hydration', {
        path: location.pathname,
      });
      return;
    }
    if (authStatus !== 'booting') return;

    logAuthRoute('starting auth bootstrap while dashboard renders', {
      path: location.pathname,
    });
    void bootstrapAuth().then((status) => {
      logAuthRoute('auth bootstrap finished', {
        path: location.pathname,
        status,
      });
    });
  }, [authStatus, bootstrapAuth, hasHydrated, location.pathname]);

  useEffect(() => {
    if (authStatus !== 'guest' || !authRedirectMessage) return;

    const message = consumeAuthRedirectMessage();
    if (!message) return;

    toast.error(message, { id: AUTH_SESSION_TOAST_ID });
  }, [authStatus, authRedirectMessage, consumeAuthRedirectMessage]);

  useEffect(() => {
    if (authStatus !== 'guest') return;

    logAuthRoute('redirecting guest away from protected route', {
      path: location.pathname,
    });
  }, [authStatus, location.pathname]);

  if (!hasHydrated || authStatus === 'booting') {
    return <>{children}</>;
  }

  if (authStatus === 'guest') {
    return <Navigate to="/" replace />;
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

          <Route path="/portifolio-1/:slug" element={<PublicProfilePage />} />
          <Route path="/:slug" element={<PublicProfilePage />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppShell>
      <AppToaster />
    </BrowserRouter>
  );
}
