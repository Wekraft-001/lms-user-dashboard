import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Mail, Phone, MapPin, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Logo from "@/assets/logo.svg";

const Profile = () => {
  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("userToken");

  const { data: userProfile, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const { data } = await axios.get(`${apiURL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      return data;
    },
    enabled: !!token,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
            <img src={Logo} className="w-[100px]" alt="Kujua360 Logo" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-foreground">My Profile</h1>
          <p className="text-muted-foreground">
            View and manage your account information
          </p>
        </div>

        {/* Profile Card */}
        <Card className="border-2 mb-6">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-primary font-bold text-3xl">
                {userProfile?.firstName?.[0]}{userProfile?.lastName?.[0]}
              </span>
            </div>
            <CardTitle className="text-2xl">
              {userProfile?.firstName} {userProfile?.lastName}
            </CardTitle>
            <CardDescription>{userProfile?.email}</CardDescription>
          </CardHeader>
        </Card>

        {/* Profile Details */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  First Name
                </Label>
                <Input
                  id="firstName"
                  value={userProfile?.firstName || ""}
                  disabled
                  className="bg-muted/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  value={userProfile?.lastName || ""}
                  disabled
                  className="bg-muted/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                Email Address
              </Label>
              <Input
                id="email"
                value={userProfile?.email || ""}
                disabled
                className="bg-muted/50"
              />
            </div>

            {userProfile?.phone && (
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={userProfile?.phone || ""}
                  disabled
                  className="bg-muted/50"
                />
              </div>
            )}

            {userProfile?.country && (
              <div className="space-y-2">
                <Label htmlFor="country" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  Country
                </Label>
                <Input
                  id="country"
                  value={userProfile?.country || ""}
                  disabled
                  className="bg-muted/50"
                />
              </div>
            )}

            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Account created: {userProfile?.createdAt ? new Date(userProfile.createdAt).toLocaleDateString() : "N/A"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
