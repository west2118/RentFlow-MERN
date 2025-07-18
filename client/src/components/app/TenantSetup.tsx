import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "../ui/switch";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { TabsContent } from "../ui/tabs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "@/hooks/useForm";
import ImageUpload from "./shared/ImageUpload";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";
import { auth } from "@/firebase";
import { useImageUploader } from "@/hooks/useImageUploader";

type FormData = {
  notifications: boolean;
  moveInDate: string;
  emergencyContact: string;
};

type ImageType = "idFront" | "idBack";

const TenantSetup = () => {
  const navigate = useNavigate();
  const [isAgree, setIsAgree] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { formData, handleChange, setField } = useForm<FormData>({
    notifications: true,
    moveInDate: "",
    emergencyContact: "",
  });
  const { images, handleImageChange, handleUploadImages } =
    useImageUploader<ImageType>(["idFront", "idBack"]);

  const handleSubmit = async () => {
    let imageUrls = [];

    const hasAnyFile = Object.values(images).some(
      (image) => image.file !== null
    );

    if (!hasAnyFile) {
      return toast.error("Please upload image.");
    }

    if (formData.moveInDate === "" || formData.emergencyContact.length < 11) {
      return toast.error("Please fill the required fields");
    }

    if (!isAgree) {
      return toast.error("Please check the agree terms");
    }

    setIsLoading(true);

    imageUrls = (await handleUploadImages()) ?? [];

    const token = await auth.currentUser?.getIdToken();

    const formattedUrls = Object.fromEntries(
      imageUrls.map((i) => [i.type, i.url])
    );

    const addedData = {
      role: "tenant",
      ...formData,
      verification: {
        ...formattedUrls,
      },
    };

    try {
      await axios.put(
        "http://localhost:8080/api/user",
        {
          ...addedData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Profile updated successfully!");
      navigate("/tenant/");
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TabsContent value="tenant">
      <Card>
        <CardHeader>
          <CardTitle>Tenant Setup</CardTitle>
          <CardDescription>
            Access your rental information and communicate with your landlord
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Notification Preferences */}
          <div className="space-y-2">
            <Label htmlFor="notification">Email Notifications</Label>
            <div className="flex items-center space-x-2">
              <Switch
                id="notification"
                name="notifications"
                checked={formData.notifications}
                onCheckedChange={(value) =>
                  setField("notifications", value === true)
                }
              />
              <Label htmlFor="notification">Receive email notifications</Label>
            </div>
          </div>

          {/* Move-in Date */}
          <div className="space-y-2">
            <Label htmlFor="move-in-date">Move-in Date</Label>
            <Input
              id="move-in-date"
              name="moveInDate"
              value={formData.moveInDate}
              onChange={handleChange}
              type="date"
            />
          </div>

          {/* Emergency Contact */}
          <div className="space-y-2">
            <Label htmlFor="emergency-contact">Emergency Contact</Label>
            <Input
              id="emergency-contact"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleChange}
              placeholder="Name and phone number"
              maxLength={11}
            />
          </div>

          <div className="space-y-2">
            <Label>Verification (Optional)</Label>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <ImageUpload
                  label="ID Front"
                  imageData={images.idFront}
                  onChangeImage={handleImageChange}
                  name="idFront"
                />

                <ImageUpload
                  label="ID Back"
                  imageData={images.idBack}
                  onChangeImage={handleImageChange}
                  name="idBack"
                />
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={isAgree}
              onCheckedChange={(value) => setIsAgree(value === true)}
            />
            <Label htmlFor="terms">
              I agree to the{" "}
              <span className="underline">terms and privacy policy.</span>
            </Label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button disabled={isLoading} onClick={handleSubmit}>
            {isLoading ? <Loader className="animate-spin h-5 w-5" /> : ""}
            Continue Setup
          </Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
};

export default TenantSetup;
