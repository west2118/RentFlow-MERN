import DataLoading from "@/components/app/DataLoading";
import LandlordLeaseDocumentCard from "@/components/app/landlord/lease/LandlordLeaseDocumentCard";
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
import { fetchData } from "@/constants/fetchData";
import { folderTypes } from "@/constants/folders";
import { useDocumentUploader } from "@/hooks/useFileUploader";
import { useForm } from "@/hooks/useForm";
import { useUserStore } from "@/store/useUserStore";
import type { UserType } from "@/types/userTypes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Upload,
  Cloud,
  User,
  FileText,
  DollarSign,
  Wrench,
  Folder,
  Search,
  Loader,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type FormData = {
  category: string;
  tenantUid: string;
};

export function LandlordUploadDocumentsPage() {
  const navigate = useNavigate();
  const token = useUserStore((state) => state.userToken);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const { formData, setField } = useForm<FormData>({
    category: "",
    tenantUid: "",
  });
  const { documents, handleDocumentsChange, uploadDocuments, setDocumuents } =
    useDocumentUploader();

  const { data, isLoading } = useQuery<UserType[]>({
    queryKey: ["landlord-all-tenants"],
    queryFn: fetchData(`http://localhost:8080/api/landlord-all-tenants`, token),
    enabled: !!token,
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (Object.values(formData).some((value) => value.trim() === "")) {
      return toast.error("Missing Required Field");
    }

    setLoadingSubmit(true);

    const docs = await uploadDocuments();

    const addedData = { ...formData, documents: docs };

    try {
      const response = await axios.post(
        `http://localhost:8080/api/document`,
        {
          ...addedData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/landlord/documents");
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleRemoveDocument = (i: number) => {
    setDocumuents((prev) => prev.filter((_, index) => index !== i));
  };

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Upload Documents</h2>
        <Button variant="outline">
          <Folder className="h-4 w-4 mr-2" />
          View All Documents
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload New Document</CardTitle>
            <CardDescription>
              Store lease agreements, payment receipts, and other important
              files
            </CardDescription>
          </CardHeader>
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Loading...</span>
            </div>
          ) : (
            <>
              <CardContent className="space-y-6">
                {/* Tenant Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Document Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setField("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {folderTypes.map((folder) => (
                          <SelectItem key={folder.value} value={folder.value}>
                            <div className="flex items-center gap-2">
                              <folder.icon className="h-4 w-4" />
                              {folder.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tenant">Select Tenant</Label>
                    <Select
                      value={formData.tenantUid}
                      onValueChange={(value) => setField("tenantUid", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose tenant" />
                      </SelectTrigger>
                      <SelectContent>
                        {data?.map((item) => (
                          <SelectItem key={item.uid} value={item.uid}>
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4" />
                              {`${item.firstName} ${item.lastName} (Unit ${item.unitNumber})`}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Document Upload */}
                <div className="space-y-2">
                  <Label>Upload Document</Label>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="h-10 w-10 text-muted-foreground mb-3" />
                        <p className="mb-2 text-sm text-muted-foreground">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PDF, DOCX, JPG, or PNG (MAX. 25MB)
                        </p>
                      </div>
                      <Input
                        id="dropzone-file"
                        type="file"
                        onChange={handleDocumentsChange}
                        className="hidden"
                        multiple
                      />
                    </label>
                  </div>
                  <div className="flex items-center justify-center mt-4 text-sm text-muted-foreground">
                    <Cloud className="h-4 w-4 mr-2" />
                    Files are securely stored in the cloud
                  </div>
                  <div className="space-y-3">
                    {documents.map((document, index) => (
                      <LandlordLeaseDocumentCard
                        key={document.name}
                        document={document}
                        index={index}
                        handleRemoveDocument={handleRemoveDocument}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  onClick={() => navigate(-1)}
                  disabled={loadingSubmit}
                  type="button"
                  variant="outline">
                  Cancel
                </Button>
                <Button disabled={loadingSubmit}>
                  {loadingSubmit ? (
                    <Loader className="animate-spin h-5 w-5" />
                  ) : (
                    <Upload className="h-4 w-4 mr-2" />
                  )}
                  Upload Documents
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      </form>
    </main>
  );
}
