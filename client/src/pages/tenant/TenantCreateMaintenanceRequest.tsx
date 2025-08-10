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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { issuesType } from "@/constants/issuesTypes";
import { urgencyLevel } from "@/constants/urgencyLevel";
import { useForm } from "@/hooks/useForm";
import { toast } from "react-toastify";
import { useImageUploader } from "@/hooks/useImageUploader";
import ImageUpload from "../../components/app/shared/ImageUpload";
import axios from "axios";
import { useUserStore } from "@/store/useUserStore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type FormData = {
  issueType: string;
  requestName: string;
  urgencyLevel: string;
  description: string;
};

type ImageType = "photo";

const TenantCreateMaintenanceRequest = ({ isEdit }: { isEdit: boolean }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useUserStore((state) => state.user);
  const token = useUserStore((state) => state.userToken);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { formData, setField, handleChange } = useForm<FormData>({
    issueType: "",
    requestName: "",
    urgencyLevel: "",
    description: "",
  });
  const { images, handleImageChange, handleUploadImages, setImages } =
    useImageUploader<ImageType>(["photo"]);

  useEffect(() => {
    if (!token || !id) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/maintenance/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response?.data;

        console.log(data);

        if (data) {
          setField("issueType", data.issueType || "");
          setField("requestName", data.requestName || "");
          setField("urgencyLevel", data.urgencyLevel || "");
          setField("description", data.description || "");
          setImages((prev) => ({
            ...prev,
            photo: {
              file: data?.photo,
              preview: data?.photo,
            },
          }));
        }
      } catch (error: any) {
        toast.error(error.response?.data?.message || error.message);
      }
    };

    fetchData();
  }, [token, id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let imageUrls = [];

    const hasAnyFile = Object.values(images).some(
      (image) => image.file !== null
    );

    if (!hasAnyFile) {
      return toast.error("Please upload image.");
    }

    if (Object.values(formData).some((value) => value.trim() === "")) {
      return toast.error("Missing field required.");
    }

    setIsLoading(true);

    imageUrls = (await handleUploadImages()) ?? [];

    const addedData = {
      ...formData,
      tenantName: `${user?.firstName} ${user?.lastName}`,
      photo: imageUrls[0].url,
    };

    try {
      let response;

      if (isEdit && id) {
        response = await axios.put(
          `http://localhost:8080/api/maintenance/${id}`,
          { ...addedData },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        response = await axios.post(
          "http://localhost:8080/api/maintenance",
          { ...addedData },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      navigate("/tenant/maintenance");
      toast.success(response?.data.message);
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Maintenance Requests</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Submit {isEdit ? "Update" : "New"} Request</CardTitle>
            <CardDescription>
              Report maintenance issues in your unit
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="issue-type">Issue Type</Label>
                <Select
                  value={formData.issueType}
                  onValueChange={(value) => setField("issueType", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select issue type" />
                  </SelectTrigger>
                  <SelectContent>
                    {issuesType.map((issue) => (
                      <SelectItem key={issue} value={issue}>
                        {issue}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="urgency">Urgency Level</Label>
                <Select
                  value={formData.urgencyLevel}
                  onValueChange={(value) => setField("urgencyLevel", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    {urgencyLevel.map((urgency) => (
                      <SelectItem key={urgency.value} value={urgency.value}>
                        <div className="flex items-center">
                          <urgency.icon className={urgency.iconClass} />
                          {urgency.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="request-name">Request Name</Label>
              <Input
                placeholder="ex. Broken Faucet"
                name="requestName"
                value={formData.requestName}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the issue in detail..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <div className="flex w-full">
                <ImageUpload
                  label="Attachment"
                  imageData={images.photo}
                  onChangeImage={handleImageChange}
                  name="photo"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              disabled={isLoading}
              onClick={() => navigate(-1)}
              type="button"
              variant="outline"
              className="mr-2">
              Cancel
            </Button>
            <Button disabled={isLoading}>
              {isLoading ? <Loader className="animate-spin h-5 w-5" /> : ""}
              {isEdit ? "Update" : "Submit"} Request
            </Button>
          </CardFooter>
        </Card>
      </form>
    </main>
  );
};

export default TenantCreateMaintenanceRequest;
