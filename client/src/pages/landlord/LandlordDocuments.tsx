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
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Search,
  FileText,
  FileImage,
  FileArchive,
  FileSpreadsheet,
  Download,
  Trash2,
  MoreVertical,
  Folder,
  FolderOpen,
  Upload,
  Cloud,
} from "lucide-react";

export function LandlordDocuments() {
  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Documents</h2>
        <div className="flex space-x-2">
          <Button variant="outline">
            <FolderOpen className="h-4 w-4 mr-2" />
            View Folders
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Folder
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Upload Documents Card */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Documents</CardTitle>
            <CardDescription>
              Store lease agreements, payment receipts, and other important
              files
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="h-10 w-10 text-muted-foreground mb-3" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PDF, DOCX, JPG, or PNG (MAX. 25MB)
                  </p>
                </div>
                <Input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  multiple
                />
              </label>
            </div>
            <div className="flex items-center justify-center mt-4 text-sm text-muted-foreground">
              <Cloud className="h-4 w-4 mr-2" />
              Files are securely stored in the cloud
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Documents
            </Button>
          </CardFooter>
        </Card>

        {/* Documents List */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>All Documents</CardTitle>
                <CardDescription>Recently uploaded files</CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search documents..." className="pl-9" />
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
                <TableRow>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Lease_Agreement_3B.pdf</p>
                        <p className="text-sm text-muted-foreground">
                          Unit 3B - Sarah Johnson
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">PDF</Badge>
                  </TableCell>
                  <TableCell>May 15, 2023</TableCell>
                  <TableCell>2.4 MB</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Folder className="h-4 w-4 mr-2 text-muted-foreground" />
                      Leases
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-1">
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <FileImage className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Tenant_ID_5A.jpg</p>
                        <p className="text-sm text-muted-foreground">
                          Unit 5A - Michael Chen
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">JPG</Badge>
                  </TableCell>
                  <TableCell>May 10, 2023</TableCell>
                  <TableCell>1.1 MB</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Folder className="h-4 w-4 mr-2 text-muted-foreground" />
                      Tenant Documents
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-1">
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <FileSpreadsheet className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">May_2023_Rent.xlsx</p>
                        <p className="text-sm text-muted-foreground">
                          All units
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">Excel</Badge>
                  </TableCell>
                  <TableCell>May 1, 2023</TableCell>
                  <TableCell>3.7 MB</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Folder className="h-4 w-4 mr-2 text-muted-foreground" />
                      Payments
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-1">
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <FileArchive className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Maintenance_Report_2C.zip</p>
                        <p className="text-sm text-muted-foreground">
                          Unit 2C - David Wilson
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">ZIP</Badge>
                  </TableCell>
                  <TableCell>Apr 28, 2023</TableCell>
                  <TableCell>15.2 MB</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Folder className="h-4 w-4 mr-2 text-muted-foreground" />
                      Maintenance
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-1">
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">4</span> of{" "}
              <span className="font-medium">23</span> documents
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
