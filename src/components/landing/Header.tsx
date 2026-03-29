import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/components/ui/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "sonner";

const menuItems = [
  { label: "Recursos", href: "#recursos" },
  { label: "Templates", href: "#templates" },
  { label: "Precos", href: "#precos" },
  { label: "FAQ", href: "#faq" },
];

function LoginDialog({
  open,
  onOpenChange,
  isLoading,
  formData,
  onChange,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isLoading: boolean;
  formData: { email: string; senha: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-slate-300 text-slate-700 hover:bg-slate-50"
        >
          Fazer Login
        </Button>
      </DialogTrigger>
      <DialogContent className="border-slate-200 bg-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-slate-900">Entrar</DialogTitle>
          <DialogDescription className="text-slate-600">
            Acesse sua conta para continuar no Bio4Dev.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="mt-2 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-700">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={onChange}
              placeholder="voce@exemplo.com"
              required
              className="border-slate-300 focus-visible:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="senha" className="text-slate-700">
              Senha
            </Label>
            <Input
              id="senha"
              name="senha"
              type="password"
              value={formData.senha}
              onChange={onChange}
              placeholder="Digite sua senha"
              required
              className="border-slate-300 focus-visible:ring-blue-500"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function Header() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [formData, setFormData] = useState({ email: "", senha: "" });
  const { login, isLoading, clearError } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      clearError();
      await login(formData.email, formData.senha);
      toast.success("Login realizado com sucesso!");
      setLoginOpen(false);
      setFormData({ email: "", senha: "" });
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Erro ao fazer login");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-6">
        <Link to="/" className="flex items-center gap-2">
          <Code2 className="h-7 w-7 text-blue-600 lg:h-8 lg:w-8" />
          <span className="text-2xl font-bold text-slate-900 lg:text-3xl">
            Bio<span className="text-blue-600">4Dev</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-slate-700",
                "transition-colors hover:bg-slate-100 hover:text-slate-900",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LoginDialog
            open={loginOpen}
            onOpenChange={setLoginOpen}
            isLoading={isLoading}
            formData={formData}
            onChange={handleChange}
            onSubmit={handleLogin}
          />
          <Link to="/signup">
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              Criar Portfolio
            </Button>
          </Link>
        </div>

        <button
          className="rounded-lg p-2 text-slate-900 hover:bg-slate-100 lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Abrir menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-medium text-slate-900 hover:bg-slate-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2 border-t border-slate-200 pt-4">
            <div onClick={() => setMobileMenuOpen(false)}>
              <LoginDialog
                open={loginOpen}
                onOpenChange={setLoginOpen}
                isLoading={isLoading}
                formData={formData}
                onChange={handleChange}
                onSubmit={handleLogin}
              />
            </div>
            <Link to="/signup">
              <Button className="w-full justify-center bg-blue-600 text-white hover:bg-blue-700">
                Criar Portfolio
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
