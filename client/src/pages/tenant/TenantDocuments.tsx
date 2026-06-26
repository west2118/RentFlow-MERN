import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TenantDocumentsTableCard from "@/components/app/tenant/document/TenantDocumentsTableCard";

const TenantDocuments = () => {
  const navigate = useNavigate();

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
        <TenantDocumentsTableCard />
      </div>
    </main>
  );
};

export default TenantDocuments;
