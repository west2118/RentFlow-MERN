import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
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
  FileText,
  FileSpreadsheet,
  Download,
  Search,
  Folder,
  ChevronDown,
  FileArchive,
  FileImage,
} from "lucide-react";

const TenantDocuments = () => {
  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Documents</h2>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Folder className="h-4 w-4 mr-2" />
            View Folders
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Lease Documents Card */}
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Lease Documents</span>
              </div>
            </CardTitle>
            <CardDescription>
              Your rental agreements and related documents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Lease Agreement 2023-2024</p>
                        <p className="text-sm text-muted-foreground">
                          Signed version
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">PDF</Badge>
                  </TableCell>
                  <TableCell>Jan 1, 2023</TableCell>
                  <TableCell>2.4 MB</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">
                          Lease Addendum - Pet Policy
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Updated March 2023
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">PDF</Badge>
                  </TableCell>
                  <TableCell>Mar 15, 2023</TableCell>
                  <TableCell>1.1 MB</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Lease Documents
            </Button>
          </CardFooter>
        </Card>

        {/* Payment Receipts Card */}
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center space-x-2">
                <FileSpreadsheet className="h-5 w-5" />
                <span>Payment Receipts</span>
              </div>
            </CardTitle>
            <CardDescription>Your rent payment confirmations</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Receipt</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <FileSpreadsheet className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">May 2023 Rent Receipt</p>
                        <p className="text-sm text-muted-foreground">
                          Paid May 1, 2023
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">PDF</Badge>
                  </TableCell>
                  <TableCell>May 1, 2023</TableCell>
                  <TableCell>$1,200.00</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <FileSpreadsheet className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">April 2023 Rent Receipt</p>
                        <p className="text-sm text-muted-foreground">
                          Paid Apr 1, 2023
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">PDF</Badge>
                  </TableCell>
                  <TableCell>Apr 1, 2023</TableCell>
                  <TableCell>$1,200.00</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Payment Receipts
            </Button>
          </CardFooter>
        </Card>

        {/* Other Documents Card */}
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center space-x-2">
                <FileArchive className="h-5 w-5" />
                <span>Other Documents</span>
              </div>
            </CardTitle>
            <CardDescription>
              Additional files related to your tenancy
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <FileImage className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Move-In Inspection Report</p>
                        <p className="text-sm text-muted-foreground">
                          January 2023
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">JPG</Badge>
                  </TableCell>
                  <TableCell>Jan 1, 2023</TableCell>
                  <TableCell>5.2 MB</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Documents
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
};

export default TenantDocuments;
