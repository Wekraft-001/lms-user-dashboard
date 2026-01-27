import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, Rocket } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import authPattern from "@/assets/auth-pattern.jpg";
import { useForm } from "react-hook-form";

const Register = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const { handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    region: "",
    country: "",
    city: "",
    sector: "",
    organisation: "",
    gender: "",
    ageRange: "",
    receiveCommunications: false,
  };

  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData({ ...formData, receiveCommunications: checked });
  };

  const validateStep1 = () => {
    const { firstName, lastName, email, phoneNumber, password } = formData;
    if (!firstName || !lastName || !email || !phoneNumber || !password) {
      toast.error("Please fill in all required fields");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleRegisteration = () => {
    setLoading(true);

    const url = `${apiURL}/auth/register`;
    axios
      .post(url, formData)
      .then((response) => {
        if (response.status === 201) {
          toast.success(
            "Welcome to Kujua360! Let's begin your learning journey."
          );
          setFormData(initialValues);
          setTimeout(() => navigate("/login"), 1500);
        }
        console.log(response, "response from creating data");
      })
      .catch((error) => {
        console.log(error);
        toast.error(`There was an error creating this profile`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGoogleLogin = () => {
    window.location.href = `${apiURL}/auth/google`;
  };

  const regions = [
    "Africa",
    "Asia",
    "Europe",
    "North America",
    "South America",
    "Oceania",
  ];

  const sectors = [
    "Healthcare",
    "Education",
    "Government",
    "Non-Profit/NGO",
    "Private Sector",
    "Research/Academia",
    "Community Organization",
    "Other",
  ];

  const genders = ["Male", "Female", "Non-binary", "Prefer not to say"];

  const ageRanges = [
    "18-24",
    "25-34",
    "35-44",
    "45-54",
    "55-64",
    "65+",
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Image */}
      <div
        className="hidden lg:flex lg:w-1/2 relative bg-cover bg-center"
        style={{ backgroundImage: `url(${authPattern})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-secondary/90 flex items-center justify-center p-12">
          <div className="text-white max-w-md">
            <h2 className="text-4xl font-bold mb-4">Join the Movement</h2>
            <p className="text-lg opacity-90 mb-8">
              Become part of a community driving pandemic preparedness and
              health justice across Africa.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 flex-shrink-0" />
                <p>Interactive learning modules</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 flex-shrink-0" />
                <p>Earn certificates upon completion</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 flex-shrink-0" />
                <p>Access comprehensive resource library</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 flex-shrink-0" />
                <p>Join a network of advocates and implementers</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>

          <Card className="border-2">
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl font-bold">
                Create Account
              </CardTitle>
              <CardDescription>
                {step === 1
                  ? "Step 1: Basic Information"
                  : "Step 2: Additional Details"}
              </CardDescription>

              {/* Progress Dots */}
              <div className="flex gap-2 pt-4">
                <div
                  className={`h-2 flex-1 rounded-full transition-colors ${
                    step >= 1 ? "bg-primary" : "bg-muted"
                  }`}
                />
                <div
                  className={`h-2 flex-1 rounded-full transition-colors ${
                    step >= 2 ? "bg-primary" : "bg-muted"
                  }`}
                />
              </div>
            </CardHeader>

            <CardContent>
              <form
                onSubmit={handleSubmit(handleRegisteration)}
                className="space-y-4"
              >
                {step === 1 && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="First name"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Last name"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="text"
                        placeholder="+2541236969855"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Create a password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <Button
                      type="button"
                      className="w-full"
                      onClick={handleNext}
                    >
                      Next Step
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="region">Region</Label>
                        <Select
                          value={formData.region}
                          onValueChange={(value) =>
                            handleSelectChange("region", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select region" />
                          </SelectTrigger>
                          <SelectContent>
                            {regions.map((region) => (
                              <SelectItem key={region} value={region}>
                                {region}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          placeholder="Your country"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          placeholder="Your city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sector">Sector</Label>
                        <Select
                          value={formData.sector}
                          onValueChange={(value) =>
                            handleSelectChange("sector", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select sector" />
                          </SelectTrigger>
                          <SelectContent>
                            {sectors.map((sector) => (
                              <SelectItem key={sector} value={sector}>
                                {sector}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="organisation">Organisation</Label>
                      <Input
                        id="organisation"
                        placeholder="Your organisation"
                        name="organisation"
                        value={formData.organisation}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select
                          value={formData.gender}
                          onValueChange={(value) =>
                            handleSelectChange("gender", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            {genders.map((gender) => (
                              <SelectItem key={gender} value={gender}>
                                {gender}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ageRange">Age Range</Label>
                        <Select
                          value={formData.ageRange}
                          onValueChange={(value) =>
                            handleSelectChange("ageRange", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select age" />
                          </SelectTrigger>
                          <SelectContent>
                            {ageRanges.map((age) => (
                              <SelectItem key={age} value={age}>
                                {age}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 pt-2">
                      <Checkbox
                        id="receiveCommunications"
                        checked={formData.receiveCommunications}
                        onCheckedChange={handleCheckboxChange}
                      />
                      <Label
                        htmlFor="receiveCommunications"
                        className="text-sm leading-relaxed cursor-pointer"
                      >
                        Would you like to receive communications on PPPR and CLM?
                      </Label>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleBack}
                        className="flex-1"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>
                      <Button type="submit" className="flex-1" disabled={loading}>
                        {loading ? (
                          <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        ) : (
                          <>
                            <Rocket className="mr-2 h-4 w-4" />
                            Create Account
                          </>
                        )}
                      </Button>
                    </div>
                  </>
                )}

                {step === 1 && (
                  <>
                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">
                          Or continue with
                        </span>
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={handleGoogleLogin}
                    >
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      Continue with Google
                    </Button>
                  </>
                )}

                <div className="text-center text-sm text-muted-foreground pt-4">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="text-primary font-semibold hover:underline"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;
