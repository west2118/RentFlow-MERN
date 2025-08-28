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
import { fetchData } from "@/constants/fetchData";
import { useForm } from "@/hooks/useForm";
import { useUserStore } from "@/store/useUserStore";
import type { NotificationType } from "@/types/notifications";
import type { UserType } from "@/types/userTypes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { User, Mail, Phone, Save, Edit, Loader, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type DataType = {
  user: UserType;
  notifications: NotificationType[];
};

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  emergencyContact: string;
};

const ProfileSettings = () => {
  const token = useUserStore((state) => state.userToken);
  const [isEdit, setIsEdit] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const { formData, setField, handleChange } = useForm<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    emergencyContact: "",
  });

  const { data, isLoading } = useQuery<DataType>({
    queryKey: ["user-info-notification"],
    queryFn: fetchData("http://localhost:8080/api/user", token),
    enabled: !!token,
  });

  useEffect(() => {
    if (data) {
      setField("firstName", data?.user?.firstName);
      setField("lastName", data?.user?.lastName);
      setField("email", data?.user?.email);
      setField("emergencyContact", data?.user?.emergencyContact);
    }
  }, [data]);

  const queryClient = useQueryClient();

  const handleSubmit = async () => {
    if (Object.values(formData).some((value) => value.trim() === "")) {
      toast.error("Missing required field");
    }

    setSubmitLoading(true);

    try {
      const response = await axios.put(
        `http://localhost:8080/api/update-user`,
        {
          ...formData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsEdit(false);
      toast.success(response.data.message);

      queryClient.invalidateQueries({ queryKey: ["user-info-notification"] });
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Profile Information</span>
          </div>
        </CardTitle>
        <CardDescription>Update your personal details</CardDescription>
      </CardHeader>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <span className="ml-2 text-muted-foreground">Loading...</span>
        </div>
      ) : isEdit ? (
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
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
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="pl-9"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Phone className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input
                id="phone"
                type="tel"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                className="pl-9"
              />
            </div>
          </div>
        </CardContent>
      ) : (
        <CardContent className="space-y-6">
          {/* Name Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl border bg-muted/20">
              <Label className="text-xs uppercase text-muted-foreground tracking-wide">
                First Name
              </Label>
              <p className="text-lg font-semibold text-gray-900">
                {data?.user.firstName}
              </p>
            </div>
            <div className="p-4 rounded-xl border bg-muted/20">
              <Label className="text-xs uppercase text-muted-foreground tracking-wide">
                Last Name
              </Label>
              <p className="text-lg font-semibold text-gray-900">
                {data?.user.lastName}
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="p-4 rounded-xl border bg-muted/20">
            <Label className="text-xs uppercase text-muted-foreground tracking-wide">
              Email
            </Label>
            <div className="flex items-center space-x-2 mt-1">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <p className="font-medium text-gray-900">{data?.user.email}</p>
            </div>
          </div>

          {/* Phone */}
          <div className="p-4 rounded-xl border bg-muted/20">
            <Label className="text-xs uppercase text-muted-foreground tracking-wide">
              Phone Number
            </Label>
            <div className="flex items-center space-x-2 mt-1">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <p className="font-medium text-gray-900">
                {data?.user.emergencyContact}
              </p>
            </div>
          </div>
        </CardContent>
      )}

      {data && (
        <CardFooter className="flex justify-end">
          {isEdit ? (
            <>
              <div className="w-full flex justify-between">
                <Button
                  disabled={submitLoading}
                  onClick={() => setIsEdit(false)}
                  variant="outline">
                  Cancel
                </Button>
                <Button disabled={submitLoading} onClick={handleSubmit}>
                  {submitLoading ? (
                    <Loader className="animate-spin h-5 w-5" />
                  ) : (
                    <Save className="h-4 w-4 mr-1" />
                  )}
                  Save Changes
                </Button>
              </div>
            </>
          ) : (
            <Button onClick={() => setIsEdit(true)}>
              <Edit className="h-4 w-4 mr-1" />
              Edit Profile
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default ProfileSettings;
