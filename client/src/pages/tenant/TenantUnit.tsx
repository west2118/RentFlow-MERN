import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Download, FileText } from "lucide-react";

import React from "react";

const TenantUnit = () => {
  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">My Unit</h2>
          <p className="text-muted-foreground">Unit 3B - 123 Main St, Apt 3B</p>
        </div>
        <Button variant="outline">
          <FileText className="h-4 w-4 mr-2" />
          Download Lease
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Unit Details Card */}
        <Card>
          <CardHeader>
            <CardTitle>Unit Details</CardTitle>
            <CardDescription>
              Basic information about your rental unit
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Unit Type</span>
              <span>2 Bed, 1 Bath Apartment</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Square Footage</span>
              <span>750 sq ft</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Parking</span>
              <span>1 Assigned Space (#32)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amenities</span>
              <span>In-unit laundry, AC</span>
            </div>
          </CardContent>
        </Card>

        {/* Lease Information Card */}
        <Card>
          <CardHeader>
            <CardTitle>Lease Information</CardTitle>
            <CardDescription>
              Your current rental agreement details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Lease Start</span>
              <span>January 1, 2023</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Lease End</span>
              <span>December 31, 2023</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Monthly Rent</span>
              <span>$1,200</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Security Deposit</span>
              <span>$1,200</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment Due Date</span>
              <span>1st of each month</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Late Fee</span>
              <span>$50 after 5 days</span>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              View Full Lease
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </CardFooter>
        </Card>

        {/* Rules & Regulations Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Community Rules</CardTitle>
            <CardDescription>
              Important policies for your building
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mt-0.5">
                  <span className="text-xs">1</span>
                </div>
                <p>Quiet hours from 10pm to 7am daily</p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mt-0.5">
                  <span className="text-xs">2</span>
                </div>
                <p>No smoking in units or common areas</p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mt-0.5">
                  <span className="text-xs">3</span>
                </div>
                <p>
                  Maximum 2 overnight guests for no more than 7 consecutive
                  nights
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mt-0.5">
                  <span className="text-xs">4</span>
                </div>
                <p>Trash must be taken to dumpsters daily</p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mt-0.5">
                  <span className="text-xs">5</span>
                </div>
                <p>No modifications to unit without written approval</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default TenantUnit;
