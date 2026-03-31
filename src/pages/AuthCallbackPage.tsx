import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "sonner";

export function AuthCallbackPage() {
  const [processing, setProcessing] = useState(true);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { handleOAuthCallback } = useAuthStore();

  useEffect(() => {
    const code = params.get("code");
    const state = params.get("state");

    if (!code) {
      toast.error("Código do Google ausente");
      navigate("/signup", { replace: true });
      return;
    }

    handleOAuthCallback(code, state)
      .then((isNew) => {
        if (isNew) {
          navigate("/profile/type", { replace: true });
          return;
        }
        navigate("/dashboard", { replace: true });
      })
      .catch(() => {
        toast.error("Não foi possível autenticar. Tente novamente.");
        navigate("/signup", { replace: true });
      })
      .finally(() => setProcessing(false));
  }, [params, navigate, handleOAuthCallback]);

  if (processing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-700">
        Conectando com o Google...
      </div>
    );
  }

  return null;
}
