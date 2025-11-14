import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Users, BookOpen, Award, TrendingUp, Plus, Settings } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "Total Learners", value: "1,234", icon: Users, color: "text-primary" },
    { label: "Active Modules", value: "4", icon: BookOpen, color: "text-secondary" },
    { label: "Completion Rate", value: "68%", icon: TrendingUp, color: "text-success" },
    { label: "Certificates Issued", value: "892", icon: Award, color: "text-accent" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-bold">K</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">Kujua360 Admin</h1>
                <p className="text-xs text-muted-foreground">Platform Management</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Module
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2 text-foreground">Welcome back, Admin</h2>
          <p className="text-muted-foreground">Here's what's happening with your LMS today</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <CardHeader className="pb-2">
                  <CardDescription className="flex items-center gap-2">
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                    {stat.label}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-2 hover:border-primary transition-all cursor-pointer">
            <CardHeader>
              <CardTitle>Content Management</CardTitle>
              <CardDescription>Upload, edit, or delete modules</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Manage Content</Button>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-secondary transition-all cursor-pointer">
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>View and manage learner accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="secondary">Manage Users</Button>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-success transition-all cursor-pointer">
            <CardHeader>
              <CardTitle>Analytics & Reports</CardTitle>
              <CardDescription>Track engagement and progress</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">View Reports</Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity Placeholder */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest learner interactions and system events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">
              <p>Activity feed coming soon...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
