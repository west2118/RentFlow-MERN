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
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Plus, Search, X } from "lucide-react";
import { useDocumentUploader } from "@/hooks/useFileUploader";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";
import type { DocumentType } from "@/types/documentTypes";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/constants/fetchData";
import LandlordDocumentTableRow from "@/components/app/landlord/document/LandlordDocumentTableRow";
import { useDebounceInput } from "@/hooks/useDebounceInput";
import { useState } from "react";
import { LandlordTenantTableRowSkeleton } from "@/components/app/landlord/tenants/LandlordTenantTableRowSkeleton";
import NoDataFoundTable from "@/components/app/NoDataFoundTable";
import Pagination from "@/components/app/Pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { folderTypes } from "@/constants/folders";

type DataType = {
  documents: DocumentType[];
  total: number;
  totalPages: number;
  page: number;
};

export function LandlordDocuments() {
  const token = useUserStore((state) => state.userToken);
  const navigate = useNavigate();

  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounceInput(search);
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useQuery<DataType>({
    queryKey: ["landlord-documents", page, limit, debouncedSearch, status],
    queryFn: fetchData(
      `http://localhost:8080/api/landlord-documents?page=${page}${
        status !== "All" ? `&status=${status}` : ""
      }&limit=${limit}${debouncedSearch ? `&search=${debouncedSearch}` : ""}`),
    
  });

  console.log(data);

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Documents</h2>
        <div className="flex space-x-2">
          <Button onClick={() => navigate("/landlord/upload-document")}>
            <Plus className="h-4 w-4 mr-2" />
            New Document
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Documents List */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>All Documents</CardTitle>
                <CardDescription>Recently uploaded files</CardDescription>
              </div>
              <div className="flex space-x-4">
                <Select
                  value={status}
                  onValueChange={(value) => setStatus(value)}>
                  <SelectTrigger className="w-34">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    {folderTypes.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                    placeholder="Search requests..."
                    className="pl-9"
                  />
                  {search && (
                    <button
                      type="button"
                      onClick={() => setSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-black">
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Uploaded</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <LandlordTenantTableRowSkeleton />
                ) : data && data?.documents.length > 0 ? (
                  data?.documents.map((item) => (
                    <LandlordDocumentTableRow key={item._id} item={item} />
                  ))
                ) : (
                  <NoDataFoundTable
                    numberOfSpan={6}
                    label="No documents records found"
                  />
                )}
              </TableBody>
            </Table>
          </CardContent>
          {data && data?.documents.length > 0 && (
            <CardFooter className="flex justify-between">
              <Pagination
                limit={limit}
                page={page}
                total={data?.total}
                totalPages={data?.totalPages}
                setPage={setPage}
              />
            </CardFooter>
          )}
        </Card>
      </div>
    </main>
  );
}
