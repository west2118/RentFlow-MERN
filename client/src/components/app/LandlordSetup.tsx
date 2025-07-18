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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { TabsContent } from "../ui/tabs";
import { useForm } from "@/hooks/useForm";
import { useState } from "react";
import { Image, Loader, Upload, UploadCloud, X } from "lucide-react";
import ImageUpload from "./shared/ImageUpload";
import axios from "axios";
import { toast } from "react-toastify";
import { auth } from "@/firebase";
import { useNavigate } from "react-router-dom";
import { useImageUploader } from "@/hooks/useImageUploader";

type FormData = {
  notifications: boolean;
  accountType: string;
  numberOfProperties: string;
};

type ImageType = "idFront" | "idBack" | "proofOfAddres";

const LandlordSetup = () => {
  const navigate = useNavigate();
  const [isAgree, setIsAgree] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { formData, handleChange, setField } = useForm<FormData>({
    notifications: true,
    accountType: "",
    numberOfProperties: "",
  });
  const { images, handleImageChange, handleUploadImages } =
    useImageUploader<ImageType>(["idFront", "idBack", "proofOfAddres"]);

  const handleSubmit = async () => {
    let imageUrls = [];

    const hasAnyFile = Object.values(images).some(
      (image) => image.file !== null
    );

    if (!hasAnyFile) {
      return toast.error("Please upload image.");
    }

    if (
      formData.accountType === "" ||
      Number(formData.numberOfProperties) <= 0
    ) {
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
      role: "landlord",
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
      navigate("/landlord/");
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TabsContent value="landlord">
      <Card>
        <CardHeader>
          <CardTitle>Landlord Setup</CardTitle>
          <CardDescription>
            Manage your properties efficiently with RentFlow
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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

          <div className="flex w-full gap-4">
            {/* Account Type */}
            <div className="space-y-2 flex-1">
              <Label htmlFor="account-type">Account Type</Label>
              <Select
                name="accountType"
                value={formData.accountType}
                onValueChange={(value) => setField("accountType", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">Individual</SelectItem>
                  <SelectItem value="company">Company</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Number of Properties */}
            <div className="space-y-2 flex-1">
              <Label htmlFor="property-count">Number of Properties</Label>
              <Input
                id="property-count"
                type="number"
                name="numberOfProperties"
                value={formData.numberOfProperties}
                onChange={handleChange}
                placeholder="e.g. 3"
                className="w-full"
              />
            </div>
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

                <ImageUpload
                  label="Proof Of Address"
                  imageData={images.proofOfAddres}
                  onChangeImage={handleImageChange}
                  name="proofOfAddres"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={isAgree}
              onCheckedChange={(value) => setIsAgree(value === true)}
            />
            <Label htmlFor="terms">
              I agree to the{" "}
              <span className="underline">terms and privacy policy</span>
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

export default LandlordSetup;
