import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Save, Bell, Shield, User, Globe, Loader2, KeyRound, Lock } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/authStore";
import { usersApi } from "@/lib/api";

export default function AdminSettingsPage() {
  const { user } = useAuthStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [securityAlerts, setSecurityAlerts] = useState(true);

  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("UTC");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingNotifications, setSavingNotifications] = useState(false);
  const [savingGeneral, setSavingGeneral] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [toggling2fa, setToggling2fa] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const data = await usersApi.getById(user.id);
        setName(data.nome || "");
        setEmail(data.email || "");
        setUsername(data.username || "");
        setEmailNotifications(data.emailNotifications ?? true);
        setMarketingEmails(data.marketingEmails ?? false);
        setSecurityAlerts(data.securityAlerts ?? true);
        setLanguage(data.language || "en");
        setTimezone(data.timezone || "UTC");
        setTwoFactorEnabled(data.twoFactorEnabled ?? false);
      } catch (err) {
        console.error(err);
        toast.error("Erro ao carregar usuário");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user]);

  const handleSaveProfile = async () => {
    if (!user) return;
    try {
      setSavingProfile(true);
      await usersApi.update(user.id, { nome: name, email, username });
      toast.success("Perfil atualizado");
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Erro ao salvar perfil");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleSaveNotifications = async () => {
    if (!user) return;
    try {
      setSavingNotifications(true);
      await usersApi.updatePreferences(user.id, {
        emailNotifications,
        marketingEmails,
        securityAlerts,
      });
      toast.success("Notificações atualizadas");
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Erro ao salvar notificações");
    } finally {
      setSavingNotifications(false);
    }
  };

  const handleSaveGeneral = async () => {
    if (!user) return;
    try {
      setSavingGeneral(true);
      await usersApi.updatePreferences(user.id, {
        language,
        timezone,
      });
      toast.success("Preferências atualizadas");
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Erro ao salvar preferências");
    } finally {
      setSavingGeneral(false);
    }
  };

  const handleChangePassword = async () => {
    if (!user) return;
    if (!oldPassword || !newPassword) {
      toast.error("Informe a senha atual e a nova senha");
      return;
    }
    try {
      setSavingPassword(true);
      await usersApi.updatePassword(user.id, {
        oldPassword,
        newPassword,
      });
      toast.success("Senha alterada");
      setOldPassword("");
      setNewPassword("");
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Erro ao trocar senha");
    } finally {
      setSavingPassword(false);
    }
  };

  const handleToggle2FA = async () => {
    if (!user) return;
    try {
      setToggling2fa(true);
      if (twoFactorEnabled) {
        await usersApi.disable2FA(user.id);
        setTwoFactorEnabled(false);
        toast.success("2FA desativado (stub)");
      } else {
        await usersApi.enable2FA(user.id);
        setTwoFactorEnabled(true);
        toast.success("2FA ativado (stub)");
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Erro ao alternar 2FA");
    } finally {
      setToggling2fa(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Settings</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">Manage your account settings and preferences.</p>
      </div>

      {/* Profile Settings */}
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-muted-foreground" />
            <div>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Update your account information</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <Button className="gap-2" onClick={handleSaveProfile} disabled={savingProfile}>
            {savingProfile && <Loader2 className="h-4 w-4 animate-spin" />}
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <div>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
            <div className="space-y-0.5 flex-1">
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive email updates about your account</p>
            </div>
            <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} className="self-start sm:self-auto" />
          </div>
          <Separator />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
            <div className="space-y-0.5 flex-1">
              <Label>Marketing Emails</Label>
              <p className="text-sm text-muted-foreground">Receive emails about new features and updates</p>
            </div>
            <Switch checked={marketingEmails} onCheckedChange={setMarketingEmails} className="self-start sm:self-auto" />
          </div>
          <Separator />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
            <div className="space-y-0.5 flex-1">
              <Label>Security Alerts</Label>
              <p className="text-sm text-muted-foreground">Get notified about important security events</p>
            </div>
            <Switch checked={securityAlerts} onCheckedChange={setSecurityAlerts} className="self-start sm:self-auto" />
          </div>
          <Button className="gap-2" onClick={handleSaveNotifications} disabled={savingNotifications}>
            {savingNotifications && <Loader2 className="h-4 w-4 animate-spin" />}
            <Save className="h-4 w-4" />
            Save Notification Settings
          </Button>
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-muted-foreground" />
            <div>
              <CardTitle>Privacy & Security</CardTitle>
              <CardDescription>Manage your privacy and security settings</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="old-password">Current Password</Label>
              <Input id="old-password" type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder="Enter current password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter new password" />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
            <div className="space-y-0.5 flex-1">
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
            </div>
            <Button
              variant={twoFactorEnabled ? "outline" : "default"}
              className="gap-2"
              onClick={handleToggle2FA}
              disabled={toggling2fa}
            >
              {toggling2fa && <Loader2 className="h-4 w-4 animate-spin" />}
              <KeyRound className="h-4 w-4" />
              {twoFactorEnabled ? "Disable 2FA" : "Enable 2FA"}
            </Button>
          </div>
          <Button
            variant="outline"
            className="gap-2"
            onClick={handleChangePassword}
            disabled={savingPassword}
          >
            {savingPassword && <Loader2 className="h-4 w-4 animate-spin" />}
            <Lock className="h-4 w-4" />
            Update Security Settings
          </Button>
        </CardContent>
      </Card>

      {/* General Settings */}
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-muted-foreground" />
            <div>
              <CardTitle>General</CardTitle>
              <CardDescription>General application settings</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="en">English</option>
              <option value="pt">Português</option>
              <option value="es">Español</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <select
              id="timezone"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="UTC">UTC</option>
              <option value="America/Sao_Paulo">BRT (Brasília)</option>
              <option value="America/New_York">EST</option>
              <option value="America/Los_Angeles">PST</option>
            </select>
          </div>
          <Button className="gap-2" onClick={handleSaveGeneral} disabled={savingGeneral}>
            {savingGeneral && <Loader2 className="h-4 w-4 animate-spin" />}
            <Save className="h-4 w-4" />
            Save General Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
