import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { FileText, XCircle } from "lucide-react";

const LandlordDocumentUploadCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lease Documents</CardTitle>
        <CardDescription>Upload signed lease agreements</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <FileText className="h-10 w-10 text-muted-foreground mb-3" />
              <p className="mb-2 text-sm text-muted-foreground">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-muted-foreground">
                PDF, DOCX, or JPG (MAX. 10MB)
              </p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Lease_Agreement.pdf</p>
                <p className="text-xs text-muted-foreground">2.4 MB</p>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <XCircle className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">View All</Button>
        <Button>
          <FileText className="h-4 w-4 mr-2" />
          Upload
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LandlordDocumentUploadCard;
