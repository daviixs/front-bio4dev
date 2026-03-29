import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
} from "./pages";
import { AdminLayoutWrapper } from "./components/admin/AdminLayoutWrapper";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
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

        <Route path="/signup" element={<SignupPage />} />

        <Route path="/profile/type" element={<UserTypeSelectionPage />} />
        <Route path="/profile/create" element={<CreateProfilePage />} />
        <Route
          path="/profile/create/developer"
          element={<DeveloperCreateProfilePage />}
        />
        <Route
          path="/onboarding/:profileId"
          element={
            <ProtectedRoute>
              <InfluencerOnboardingPage />
            </ProtectedRoute>
          }
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

        <Route path="/dashboard-old" element={<Navigate to="/dashboard" replace />} />

        <Route path="/portifolio-1/:slug" element={<PublicProfilePage />} />
        <Route path="/:slug" element={<PublicProfilePage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
