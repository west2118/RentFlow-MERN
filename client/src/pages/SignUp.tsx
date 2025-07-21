import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft,
  User,
  Mail,
  Lock,
  Home,
  Eye,
  EyeOff,
  ChevronDown,
  Search,
  Apple,
  LucideChrome,
  Loader,
} from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useForm } from "@/hooks/useForm";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import axios from "axios";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUp() {
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isAgree, setIsAgree] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { formData, handleChange } = useForm<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [searchParams] = useSearchParams();
  const inviteToken = searchParams.get("invite");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(formData).some((value) => value.trim() === "")) {
      return toast.error("Missing Required Field");
    }

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Password not matched");
    }

    if (!isAgree) {
      return toast.error("Plese check on agree terms");
    }

    setIsLoading(true);

    const fullData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      ...(inviteToken && { inviteToken }),
    };

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const token = await userCredential.user.getIdToken();

      await axios.put(
        "http://localhost:8080/api/user",
        {
          ...fullData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Account created successfully!");
      navigate("/onboarding");
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4">
        <form onSubmit={handleSubmit}>
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
              <div className="flex flex-col items-center justify-center gap-1">
                <CardTitle className="text-2xl">Create Account</CardTitle>
                <CardDescription>
                  Enter your details to get started
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      id="first-name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      className="pl-9"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input
                    id="last-name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="email@example.com"
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type={isShowPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-9"
                  />
                  <Button
                    onClick={() => setIsShowPassword(!isShowPassword)}
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full">
                    {isShowPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    id="confirm-password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    type={isShowPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-9"
                  />
                  <Button
                    onClick={() => setIsShowPassword(!isShowPassword)}
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full">
                    {isShowPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={isAgree}
                  onCheckedChange={(value) => setIsAgree(value === true)}
                  id="terms"
                />
                <Label htmlFor="terms">
                  I agree to the{" "}
                  <a href="/terms" className="underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="underline">
                    Privacy Policy
                  </a>
                </Label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button disabled={isLoading} className="w-full">
                {isLoading ? <Loader className="animate-spin h-5 w-5" /> : ""}
                Create Account
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Button type="button" variant="outline">
                  <LucideChrome className="w-4 h-4 mr-2" />
                  Google
                </Button>
                <Button type="button" variant="outline">
                  <Apple className="w-4 h-4 mr-2" />
                  Apple
                </Button>
              </div>

              <div className="justify-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link to="/signin" className="text-black p-0 h-auto">
                    Sign in
                  </Link>
                </p>
              </div>
            </CardFooter>
          </Card>
        </form>
      </main>
    </div>
  );
}
