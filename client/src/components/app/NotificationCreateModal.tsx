import React, { useEffect, useState } from "react";
import { Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import ReactDOM from "react-dom";
import axios from "axios";
import { useUserStore } from "@/store/useUserStore";
import { useForm } from "@/hooks/useForm";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { toast } from "react-toastify";

type NotificationCreateModalProps = {
  isModalOpen: boolean;
  onCloseModal: () => void;
  fullName: string;
  tenantUid: string;
};

type FormData = {
  title: string;
  message: string;
  type: string;
};

export const NotificationCreateModal = ({
  isModalOpen,
  onCloseModal,
  fullName,
  tenantUid,
}: NotificationCreateModalProps) => {
  const token = useUserStore((state) => state.userToken);
  const { formData, handleChange, setField } = useForm<FormData>({
    title: "",
    message: "",
    type: "",
  });
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (Object.values(formData).some((value) => value.trim() === "")) {
      return toast.error("Missing required fields");
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:8080/api/notification`,
        {
          ...formData,
          tenantUid,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }

    console.log(formData);
  };

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        onClick={onCloseModal}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-black">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">
              Create Notification
            </h2>
          </div>
          <button
            onClick={onCloseModal}
            className="rounded-md p-2 hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Receiver Name */}
        <div className="px-6 py-3 border-b">
          <p className="text-sm font-medium text-gray-700">
            Send To:{" "}
            <span className="font-semibold text-gray-900">{fullName}</span>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter notification title"
                onChange={handleChange}
                value={formData.title}
                name="title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                rows={3}
                placeholder="Enter notification message"
                onChange={handleChange}
                value={formData.message}
                name="message"
              />
            </div>

            <div className="space-y-2">
              <Label>Type</Label>
              <ToggleGroup
                type="single"
                onValueChange={(value) => setField("type", value)}
                className="grid grid-cols-3 gap-2 mt-1 w-full">
                <ToggleGroupItem
                  value="Info"
                  className="w-full rounded-md data-[state=on]:bg-gray-200 bg-gray-100 text-gray-700">
                  Info
                </ToggleGroupItem>

                <ToggleGroupItem
                  value="Warning"
                  className="w-full rounded-md data-[state=on]:bg-yellow-200 bg-gray-100 text-gray-700">
                  Warning
                </ToggleGroupItem>

                <ToggleGroupItem
                  value="Urgent"
                  className="w-full rounded-md data-[state=on]:bg-red-300 bg-gray-100 text-gray-700">
                  Urgent
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 p-6 border-t">
            <Button onClick={onCloseModal} variant="outline">
              Cancel
            </Button>
            <Button className="bg-black text-white hover:bg-gray-800">
              Send Notification
            </Button>
          </div>
        </form>
      </div>
    </div>,
    modalRoot
  );
};
