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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Home,
  Hash,
  Layers,
  Ruler,
  MapPin,
  DollarSign,
  CheckCircle2,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "@/hooks/useForm";
import { unitTypes } from "@/constants/unitTypes";
import { amenities } from "@/constants/amenities";
import { statuses } from "@/constants/statuses";
import { useRef, useState } from "react";
import axios from "axios";
import { useUserStore } from "@/store/useUserStore";
import { toast } from "react-toastify";
import { useImageUploader } from "@/hooks/useImageUploader";
import ImageUpload from "@/components/app/shared/ImageUpload";
import { useNavigate } from "react-router-dom";

type FormData = {
  type: string;
  status: string;
};

type ImageType = "photo";

export function LandlordCreateUnit() {
  const navigate = useNavigate();
  const token = useUserStore((state) => state.userToken);
  const refData = useRef({
    name: "",
    unitNumber: "",
    floor: 0,
    notes: "",
    bathrooms: 0,
    bedrooms: 0,
    size: 0,
    address: "",
    rentAmount: 0,
  });
  const { formData, setField } = useForm<FormData>({
    type: "",
    status: "",
  });
  const [availableAmenities, setAvailableAmenities] = useState<string[]>([]);
  const { images, handleImageChange, handleUploadImages } =
    useImageUploader<ImageType>(["photo"]);

  const numberFields = ["floor", "size", "rentAmount", "bedrooms", "bathrooms"];

  const handleRefChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    refData.current = {
      ...refData.current,
      [name]: numberFields.includes(name) ? Number(value) : value,
    };
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let imageUrls = [];

    const hasAnyFile = Object.values(images).some(
      (image) => image.file !== null
    );

    if (!hasAnyFile) {
      return toast.error("Please upload image.");
    }

    imageUrls = (await handleUploadImages()) ?? [];

    const fullData = {
      ...formData,
      ...refData.current,
      photos: imageUrls[0].url,
      amenities: availableAmenities,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/unit",
        {
          ...fullData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/landlord/units");
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Home className="h-6 w-6" />
            Add New Rental Unit
          </CardTitle>
          <CardDescription>
            Fill out the form to register a new rental unit in your property
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Unit Basic Information */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Unit Name</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Home className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={refData.current.name}
                    onChange={handleRefChange}
                    placeholder="e.g. Garden View Apartment"
                    className="pl-9"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="unitNumber">Unit Number</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Hash className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    id="unitNumber"
                    name="unitNumber"
                    defaultValue={refData.current.unitNumber}
                    onChange={handleRefChange}
                    placeholder="e.g. 3B"
                    className="pl-9"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="floor">Floor Number</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Layers className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    id="floor"
                    type="number"
                    name="floor"
                    defaultValue={refData.current.floor}
                    onChange={handleRefChange}
                    placeholder="e.g. 2"
                    className="pl-9"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">
                  <div className="flex items-center gap-2">
                    Additional Notes
                  </div>
                </Label>
                <Textarea
                  id="notes"
                  name="notes"
                  defaultValue={refData.current.notes}
                  onChange={handleRefChange}
                  placeholder="Enter any additional details about the unit (amenities, special features, etc.)"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Unit Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setField("type", value)}
                    required
                    name="type">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select unit type" />
                    </SelectTrigger>
                    <SelectContent>
                      {unitTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input
                    type="number"
                    name="bedrooms"
                    defaultValue={refData.current.bedrooms}
                    onChange={handleRefChange}
                    id="bedrooms"
                    placeholder="e.g. 2"
                    min={0}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input
                    type="number"
                    name="bathrooms"
                    defaultValue={refData.current.bathrooms}
                    onChange={handleRefChange}
                    id="bathrooms"
                    placeholder="e.g. 1"
                    min={0}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <ImageUpload
                    label="Unit Photo"
                    imageData={images.photo}
                    onChangeImage={handleImageChange}
                    name="photo"
                    width={400}
                  />
                </div>
              </div>
            </div>

            {/* Unit Details */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="size">Size (sq ft)</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Ruler className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    id="size"
                    type="number"
                    name="size"
                    defaultValue={refData.current.size}
                    onChange={handleRefChange}
                    placeholder="e.g. 750"
                    className="pl-9"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Full Address</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    id="address"
                    name="address"
                    defaultValue={refData.current.address}
                    onChange={handleRefChange}
                    placeholder="123 Main St, City, State ZIP"
                    className="pl-9"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rentAmount">Monthly Rent ($)</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    id="rentAmount"
                    type="number"
                    name="rentAmount"
                    defaultValue={refData.current.rentAmount}
                    onChange={handleRefChange}
                    placeholder="e.g. 1200"
                    className="pl-9"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Current Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setField("status", value)}
                  required
                  defaultValue="available">
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        <div className="flex items-center gap-2">{status}</div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label>Amenities</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {amenities.map((amenity, index) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox
                        checked={availableAmenities.includes(amenity)}
                        onCheckedChange={(checked) => {
                          setAvailableAmenities((prev) =>
                            checked
                              ? [...prev, amenity]
                              : prev.filter((item) => item !== amenity)
                          );
                        }}
                        id={`amenity-${index}`}
                      />
                      <Label
                        htmlFor={`amenity-${index}`}
                        className="flex items-center gap-2">
                        {amenity}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-4">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit">Create Unit</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
