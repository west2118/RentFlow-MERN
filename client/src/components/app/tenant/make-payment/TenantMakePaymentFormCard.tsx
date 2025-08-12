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
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@/hooks/useForm";
import { useImageUploader } from "@/hooks/useImageUploader";
import { Banknote, DollarSign, Loader, Phone, Upload } from "lucide-react";
import ImageUpload from "../../shared/ImageUpload";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { paymentMethods } from "@/constants/paymentMethods";

type FormData = {
  amountPaid: number;
  accountNumber: string;
  method: string;
  transactionDate: string;
  notes: string;
};

type ImageType = "receipt";

type TenantMakePaymentFormCardProps = {
  token: string | null;
};

const TenantMakePaymentFormCard = ({
  token,
}: TenantMakePaymentFormCardProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { formData, handleChange, setField } = useForm<FormData>({
    amountPaid: 0,
    accountNumber: "",
    method: "",
    transactionDate: "",
    notes: "",
  });
  const { images, handleImageChange, handleUploadImages } =
    useImageUploader<ImageType>(["receipt"]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let imageUrls = [];

    const hasAnyFile = Object.values(images).some(
      (value) => value.file !== null
    );

    const isFormValid = () => {
      return (
        formData.amountPaid > 0 &&
        formData.accountNumber.trim() !== "" &&
        formData.method.trim() !== "" &&
        formData.transactionDate.trim() !== ""
      );
    };

    if (!isFormValid()) {
      return toast.error("Please fill out all required fields.");
    }

    if (!hasAnyFile) {
      return toast.error("Please upload image.");
    }

    setIsLoading(true);

    imageUrls = (await handleUploadImages()) ?? [];

    try {
      const response = await axios.post(
        `http://localhost:8080/api/receipt`,
        {
          ...formData,
          fileUrl: imageUrls[0].url,
          paymentId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/tenant/payments");
      toast.success(response?.data.message);
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Payment Information</CardTitle>
          <CardDescription>Provide details of your payment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">Amount Paid</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input
                type="number"
                placeholder="0"
                className="pl-8"
                name="amountPaid"
                onChange={handleChange}
                value={formData.amountPaid}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              Landlord's Contact Number
            </Label>
            <Input
              placeholder="09238473841"
              name="accountNumber"
              onChange={handleChange}
              value={formData.accountNumber}
              maxLength={11}
            />
            <p className="text-sm text-muted-foreground">
              This is where you sent the payment
            </p>
          </div>

          <div className="space-y-2">
            <Label>Payment Method</Label>
            <Select
              value={formData.method}
              onValueChange={(value) => setField("method", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                {paymentMethods.map((method) => (
                  <SelectItem key={method.value} value={method.value}>
                    {method.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Transaction Date</Label>
            <div className="flex items-center gap-2">
              <Input
                type="date"
                name="transactionDate"
                onChange={handleChange}
                value={formData.transactionDate}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Additional Notes</Label>
            <Textarea
              placeholder="Include any payment reference numbers or special instructions"
              rows={3}
              name="notes"
              onChange={handleChange}
              value={formData.notes}
            />
          </div>

          <ImageUpload
            label="Receipt Photo"
            imageData={images.receipt}
            onChangeImage={handleImageChange}
            name="receipt"
            width={200}
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button disabled={isLoading}>
            {isLoading ? <Loader className="animate-spin h-5 w-5" /> : ""}
            <Upload className="h-4 w-4 mr-2" />
            Submit Payment Proof
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default TenantMakePaymentFormCard;
