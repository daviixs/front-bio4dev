import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import {
  LandingPage,
  Home,
  Login,
  SignupPage,
  CreateProfilePage,
  SetupWizardPage,
  DashboardPage,
  DashboardOverview,
  AdminDashboard,
  BioPage,
  BioEditPage,
  AnalyticsPage,
  AdminSettingsPage,
  PublicProfilePage,
  ProfileEdit,
  ProjectsEdit,
  SocialsEdit,
  PagesEdit,
  AppearanceEdit,
  SettingsPage,
  PortfolioEditorPage,
} from "./pages";
import { AdminLayoutWrapper } from "./components/admin/AdminLayoutWrapper";

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  // Removida a verificação de login - acesso livre
  return <>{children}</>;
}

// Auth Route Component (sem verificação de login)
function AuthRoute({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      {/* Toast Notifications */}
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
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/old-landing" element={<LandingPage />} />

        {/* Auth Routes */}
        <Route
          path="/login"
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthRoute>
              <SignupPage />
            </AuthRoute>
          }
        />

        {/* Profile Creation */}
        <Route path="/profile/create" element={<CreateProfilePage />} />
        <Route path="/setup" element={<SetupWizardPage />} />

        {/* Portfolio Editor */}
        <Route
          path="/dashboard/portfolio/:portfolioId"
          element={
            <ProtectedRoute>
              <PortfolioEditorPage />
            </ProtectedRoute>
          }
        />

        {/* Dashboard Routes - Admin Dashboard */}
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
          <Route path="bio/:id" element={<BioEditPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>

        {/* Old Dashboard Routes - kept for backward compatibility */}
        <Route
          path="/dashboard-old"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardOverview />} />
          <Route path="profile" element={<ProfileEdit />} />
          <Route path="projects" element={<ProjectsEdit />} />
          <Route path="socials" element={<SocialsEdit />} />
          <Route path="pages" element={<PagesEdit />} />
          <Route path="appearance" element={<AppearanceEdit />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Public Profile - must be last due to dynamic route */}
        <Route path="/:username" element={<PublicProfilePage />} />

        {/* 404 - Redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
