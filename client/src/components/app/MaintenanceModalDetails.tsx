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
  AlertTriangle,
  Calendar,
  User,
  Home,
  Hammer,
  Clock,
  CheckCircle2,
  Wrench,
  FileText,
  ImageIcon,
} from "lucide-react";
import { Label } from "../ui/label";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import type { MaintenanceType } from "@/types/maintenanceTypes";
import { statusStyle } from "@/constants/statusStyle";
import { formatDate } from "@/constants/formatDate";
import { urgencyLevel } from "@/constants/urgencyLevel";

type MaintenanceModalDetailsProps = {
  isModalOpen: boolean;
  onCloseModal: () => void;
  item: MaintenanceType | null;
};

export function MaintenanceModalDetails({
  isModalOpen,
  onCloseModal,
  item,
}: MaintenanceModalDetailsProps) {
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

  const level = urgencyLevel.find(
    (level) => level.value === item?.urgencyLevel
  );

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div
      onClick={onCloseModal}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-xl w-full max-w-3xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-lg p-6 border-b sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <Wrench className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Maintenance Request Details</h2>
          </div>
          <button
            onClick={onCloseModal}
            className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Request Status */}
          <div className="flex justify-between items-center">
            {statusStyle(item?.status)}
            <div className="text-sm text-muted-foreground">
              Submitted: {formatDate(item?.createdAt!)}
            </div>
          </div>

          {/* Request Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Request Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <Hammer className="h-4 w-4 text-muted-foreground" />
                    Issue Type
                  </Label>
                  <div className="p-3 border rounded-lg">
                    <span className="font-medium">{item?.requestName}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    Urgency Level
                  </Label>
                  <div className="p-3 border rounded-lg">
                    <span className="font-medium">{level?.label}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  Description
                </Label>
                <div className="p-3 border rounded-lg bg-muted/50">
                  <p className="text-muted-foreground">{item?.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Requester Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Requester Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <User className="h-4 w-4 text-muted-foreground" />
                    Tenant Name
                  </Label>
                  <div className="p-3 border rounded-lg">
                    <span className="font-medium">{item?.tenantName}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <Home className="h-4 w-4 text-muted-foreground" />
                    Unit Number
                  </Label>
                  <div className="p-3 border rounded-lg">
                    <span className="font-medium">{item?.unitNumber}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Photo Evidence */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Photo Evidence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <img
                  src={item?.photo}
                  alt="Leaky sink"
                  className="w-full h-auto object-contain max-h-64"
                />
              </div>
            </CardContent>
          </Card>

          {/* Technician Notes */}
          {item?.techNotes && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Technician Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 border rounded-lg bg-muted/50">
                  <p className="text-muted-foreground">{item?.techNotes}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t flex justify-end gap-2">
          <Button onClick={onCloseModal} variant="outline">
            Close
          </Button>
          {/* <Button variant="secondary">Update Status</Button>
          <Button>Assign Technician</Button> */}
        </div>
      </div>
    </div>,
    modalRoot
  );
}
