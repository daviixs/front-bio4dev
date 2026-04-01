import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import {
  Home,
  SignupPage,
  UserTypeSelectionPage,
  CreateProfilePage,
  DeveloperCreateProfilePage,
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
} from "./pages";
import { AdminLayoutWrapper } from "./components/admin/AdminLayoutWrapper";
import { useAuthStore } from "@/stores/authStore";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { isAuthenticated, refreshAccessToken } = useAuthStore();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;
    const ensureAuth = async () => {
      if (isAuthenticated) {
        if (mounted) setChecking(false);
        return;
      }

      const token = await refreshAccessToken();
      if (!token) {
        navigate("/profile/type", { replace: true });
        return;
      }
      if (mounted) setChecking(false);
    };

    ensureAuth();
    return () => {
      mounted = false;
    };
  }, [isAuthenticated, refreshAccessToken, navigate]);

  if (checking) return null;
  return <>{children}</>;
}

function AppShell({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isLanding = location.pathname === "/" || location.pathname === "/home";
  return <div className={isLanding ? "" : "app-shell"}>{children}</div>;
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#1a1a2e",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
            },
          }}
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          <Route path="/signup" element={<Navigate to="/profile/type" replace />} />
          <Route path="/auth/callback/google" element={<AuthCallbackPage />} />

          <Route path="/profile/type" element={<UserTypeSelectionPage />} />
          <Route path="/profile/create" element={<CreateProfilePage />} />
          <Route
            path="/profile/create/developer"
            element={<DeveloperCreateProfilePage />}
          />
          <Route path="/onboarding/:profileId" element={<InfluencerOnboardingPage />} />

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

          <Route path="/dashboard-old" element={<Navigate to="/dashboard" replace />} />

          <Route path="/portifolio-1/:slug" element={<PublicProfilePage />} />
          <Route path="/:slug" element={<PublicProfilePage />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}
