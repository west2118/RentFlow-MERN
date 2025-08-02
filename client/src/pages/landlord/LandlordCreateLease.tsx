import { Button } from "@/components/ui/button";
import { FileText, Calendar as CalendarIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "@/hooks/useForm";
import axios from "axios";
import { useUserStore } from "@/store/useUserStore";
import { toast } from "react-toastify";
import LandlordDocumentUploadCard from "@/components/app/landlord/LandlordDocumentUploadCard";
import { useDocumentUploader } from "@/hooks/useFileUploader";
import LandlordLeaseFormCard from "@/components/app/landlord/lease/LandlordLeaseFormCard";
import { useState } from "react";

type FormData = {
  leaseStart: Date | undefined;
  leaseEnd: Date | undefined;
  rentAmount: number;
  securityDeposit: number;
  paymentSchedule: string;
  notes: string;
};

export function LandlordCreateLease() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useUserStore((state) => state.userToken);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { formData, handleChange, setField } = useForm<FormData>({
    leaseStart: undefined,
    leaseEnd: undefined,
    rentAmount: 0,
    securityDeposit: 0,
    paymentSchedule: "",
    notes: "",
  });
  const { documents, handleDocumentsChange, uploadDocuments, setDocumuents } =
    useDocumentUploader();

  const handleRemoveDocument = (i: number) => {
    setDocumuents((prev) => prev.filter((_, index) => index !== i));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (
      formData.leaseStart === undefined ||
      formData.leaseEnd === undefined ||
      formData.rentAmount === 0 ||
      formData.securityDeposit === 0 ||
      formData.paymentSchedule === "" ||
      formData.notes === "" ||
      documents.length === 0
    ) {
      return toast.error("Missing Required Field");
    }

    setIsLoading(true);

    const docs = await uploadDocuments();

    const addedData = { ...formData, documents: docs };

    try {
      const response = await axios.post(
        `http://localhost:8080/api/lease/${id}`,
        {
          ...addedData,
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Create New Lease</h2>
          <p className="text-muted-foreground">Enter lease agreement details</p>
        </div>
        <Button variant="outline">
          <FileText className="h-4 w-4 mr-2" />
          View All Leases
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lease Information Form */}
        <LandlordLeaseFormCard
          formData={formData}
          setField={setField}
          handleChange={handleChange}
          isLoading={isLoading}
        />

        {/* Document Upload Section */}
        <LandlordDocumentUploadCard
          handleDocumentsChange={handleDocumentsChange}
          documents={documents}
          handleRemoveDocument={handleRemoveDocument}
        />
      </div>
    </form>
  );
}
