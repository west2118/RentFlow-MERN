import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  X,
  FileText,
  Calendar,
  DollarSign,
  User,
  Home,
  Clock,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Label } from "../ui/label";
import type { LeaseType } from "@/types/leaseTypes";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUserStore } from "@/store/useUserStore";
import type { UserType } from "@/types/userTypes";
import { toast } from "react-toastify";
import { formatDate } from "@/constants/formatDate";
import type { UnitType } from "@/types/unitTypes";
import DataLoading from "./DataLoading";

type LeaseDetailsModalProps = {
  isModalOpen: boolean;
  isCloseModal: () => void;
  lease: LeaseType | null;
};

type DataType = {
  user: UserType;
  unit: UnitType;
};

export function LeaseDetailsModal({
  isModalOpen,
  isCloseModal,
  lease,
}: LeaseDetailsModalProps) {
  const token = useUserStore((state) => state.userToken);

  const [data, setData] = useState<DataType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!lease?.tenantUid || !token) return;

    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          `http://localhost:8080/api/unit-user/${lease?.tenantUid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData(response.data);
      } catch (error: any) {
        toast.error(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [lease?.tenantUid, token]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isModalOpen]);

  console.log(data?.unit);

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return (
    <div
      onClick={isCloseModal}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-xl w-full max-w-3xl">
        {/* Modal Header */}
        <div className="flex rounded-lg items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Lease Agreement Details</h2>
          </div>
          <button
            onClick={isCloseModal}
            className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Content */}
        {loading ? (
          <DataLoading />
        ) : (
          <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto hide-scrollbar">
            {/* Lease Status */}
            <div className="flex justify-between items-center">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                {lease?.isActive ? "Active" : "Not Active"} Lease
              </div>
              <div className="text-sm text-muted-foreground">
                Created: {formatDate(lease?.createdAt!)}
              </div>
            </div>

            {/* Property and Tenant Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="h-5 w-5" />
                    Property Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Unit</span>
                    <span className="font-medium text-end">
                      {data?.unit?.name} ({data?.unit?.unitNumber})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Address</span>
                    <span className="font-medium text-end">
                      {data?.unit?.address}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Landlord</span>
                    <span className="font-medium text-end">
                      {data?.unit?.landlord}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Tenant Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tenant Name</span>
                    <span className="font-medium text-end">
                      {data?.user
                        ? `${data?.user?.firstName} ${data?.user?.lastName}`
                        : "No tenant assigned"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gmail</span>
                    <span className="font-medium text-end">
                      {data?.user?.email}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Contact</span>
                    <span className="font-medium text-end">
                      {data?.user?.emergencyContact}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Lease Terms */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Lease Terms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      Payment Details
                    </Label>
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Monthly Rent
                        </span>
                        <span className="font-medium text-end">
                          ${lease?.rentAmount.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-muted-foreground">
                          Security Deposit
                        </span>
                        <span className="font-medium text-end">
                          ${lease?.securityDeposit.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-muted-foreground">
                          Payment Schedule
                        </span>
                        <span className="font-medium text-end">
                          {lease?.paymentSchedule}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      Lease Period
                    </Label>
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Start Date
                        </span>
                        <span className="font-medium text-end">
                          {formatDate(lease?.leaseStart!)}
                        </span>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-muted-foreground">End Date</span>
                        <span className="font-medium text-end">
                          {formatDate(lease?.leaseEnd!)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {lease?.lateFee && (
                  <div className="space-y-2 mt-4">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      <AlertCircle className="h-4 w-4 text-muted-foreground" />
                      Late Fee Policy
                    </Label>
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Late Fee Amount
                        </span>
                        <span className="font-medium text-end">
                          ${lease?.lateFee.amount}
                        </span>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-muted-foreground">
                          Grace Period
                        </span>
                        <span className="font-medium text-end">
                          {lease?.lateFee.afterDays} days
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Additional Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Additional Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 border rounded-lg bg-muted/50">
                  <p className="text-muted-foreground">{lease?.notes}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
