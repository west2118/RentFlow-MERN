import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
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
import { Textarea } from "@/components/ui/textarea";
import { statusStyle } from "@/constants/statusStyle";
import { useUserStore } from "@/store/useUserStore";
import type { MaintenanceType } from "@/types/maintenanceTypes";
import axios from "axios";
import { Mail, X, AlertCircle, Clock, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";

type LandlordManageRequestModalProps = {
  isModalOpen: boolean;
  onCloseModal: () => void;
  item: MaintenanceType;
  status: string | undefined;
};

const LandlordManageRequestModal = ({
  isModalOpen,
  onCloseModal,
  item,
  status,
}: LandlordManageRequestModalProps) => {
  const token = useUserStore((state) => state.userToken);
  const [message, setMessage] = useState("");
  const [techNotes, setTechNotes] = useState("");

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

  const handleUpdateMaintenance = async () => {
    if (message.trim() === "" || status === "") {
      return toast.error("Missing required field");
    }

    const submitData = {
      tenantName: item?.tenantName,
      maintenanceId: item._id,
      tenantUid: item?.tenantUid,
      status,
      message,
    };

    const fullData =
      status === "Completed" ? { ...submitData, techNotes } : submitData;

    try {
      const response = await axios.put(
        "http://localhost:8080/api/inprogress-maintenance",
        {
          ...fullData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response?.data?.message);
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div
      onClick={onCloseModal}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl">
        <CardHeader className="relative">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Manage Request</CardTitle>
              <CardDescription>Update status or message tenant</CardDescription>
            </div>
            <button
              onClick={onCloseModal}
              className="text-muted-foreground hover:text-foreground p-1">
              <X className="h-5 w-5" />
            </button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Selected Request</Label>
            <div className="p-3 border rounded-lg">
              <p className="font-medium">{item?.requestName}</p>
              <p className="text-sm text-muted-foreground">
                Unit {item?.unitNumber} - {item?.tenantName}
              </p>
              <p className="text-sm mt-2">{item?.description}</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Update Status</Label>
            <div className="flex items-center border border-input bg-background rounded-md px-3 py-2 text-sm text-muted-foreground h-10 w-fit">
              {statusStyle(status)}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message Tenant</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Update the tenant on the maintenance progress..."
              rows={4}
            />
            {status === "Completed" && (
              <>
                <Label htmlFor="message">Technician Notes</Label>
                <Textarea
                  id="message"
                  value={techNotes}
                  onChange={(e) => setTechNotes(e.target.value)}
                  placeholder="Technician notes..."
                  rows={4}
                />
              </>
            )}
            <div className="flex justify-between items-center pt-2">
              <div className="text-sm text-muted-foreground">
                Message will be sent via email and in-app notification
              </div>
              <Button
                onClick={handleUpdateMaintenance}
                variant="outline"
                size="sm">
                <Mail className="h-4 w-4 mr-2" />
                Mark as {status === "In Progress" ? "In Progress" : "Completed"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>,
    modalRoot
  );
};

export default LandlordManageRequestModal;
