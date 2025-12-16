import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Save, Bell, Shield, User, Globe } from "lucide-react";

export default function AdminSettingsPage() {
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
              <Input id="name" placeholder="John Doe" defaultValue="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" defaultValue="john@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="johndoe" defaultValue="johndoe" />
            </div>
            <Button className="gap-2">
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
              <Switch defaultChecked className="self-start sm:self-auto" />
            </div>
            <Separator />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
              <div className="space-y-0.5 flex-1">
                <Label>Marketing Emails</Label>
                <p className="text-sm text-muted-foreground">Receive emails about new features and updates</p>
              </div>
              <Switch className="self-start sm:self-auto" />
            </div>
            <Separator />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
              <div className="space-y-0.5 flex-1">
                <Label>Security Alerts</Label>
                <p className="text-sm text-muted-foreground">Get notified about important security events</p>
              </div>
              <Switch defaultChecked className="self-start sm:self-auto" />
            </div>
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
            <div className="space-y-2">
              <Label htmlFor="password">Change Password</Label>
              <Input id="password" type="password" placeholder="Enter new password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" placeholder="Confirm new password" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
              <div className="space-y-0.5 flex-1">
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
              </div>
              <Switch className="self-start sm:self-auto" />
            </div>
            <Button variant="outline" className="gap-2">
              <Shield className="h-4 w-4" />
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
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="utc">UTC</option>
                <option value="est">EST</option>
                <option value="pst">PST</option>
                <option value="brt">BRT (Brasília)</option>
              </select>
            </div>
            <Button className="gap-2">
              <Save className="h-4 w-4" />
              Save General Settings
            </Button>
          </CardContent>
        </Card>
      </div>
  );
}
