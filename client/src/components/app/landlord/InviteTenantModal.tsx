import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useFetchData from "@/hooks/useFetchData";
import { useForm } from "@/hooks/useForm";
import { useUserStore } from "@/store/useUserStore";
import axios from "axios";
import { Mail, User, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";

type InviteTenantModalProps = {
  isModalOpen: boolean;
  isCloseModal: () => void;
  unitId: string | undefined;
};

type FormData = {
  tenantName: string;
  gmail: string;
};

export function InviteTenantModal({
  isModalOpen,
  isCloseModal,
  unitId,
}: InviteTenantModalProps) {
  const token = useUserStore((state) => state.userToken);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inviteLink, setInviteLink] = useState("");
  const { formData, handleChange } = useForm<FormData>({
    tenantName: "",
    gmail: "",
  });

  useEffect(() => {
    if (!token) return;

    setIsLoading(true);

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/invite/${unitId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setInviteLink(response?.data);
      } catch (error: any) {
        toast.error(error.response?.data?.message || error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

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

  if (!isModalOpen) return null;

  const handleSubmit = async () => {
    if (Object.values(formData).some((value) => value.trim() === "")) {
      return toast.error("Missing field required");
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/invite",
        {
          ...formData,
          unitId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);
      setInviteLink(response.data.inviteLink);
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div
      onClick={isCloseModal}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-lg w-full max-w-md">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg">Invite Tenant via Gmail</h3>
          </div>
          <button
            onClick={isCloseModal}
            className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Content */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-10 gap-4 text-muted-foreground">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm">Loading...</p>
          </div>
        ) : (
          <>
            <div className="p-6 space-y-4">
              {!inviteLink ? (
                <>
                  <div className="space-y-2">
                    <Label
                      htmlFor="tenantName"
                      className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Tenant Name
                    </Label>
                    <Input
                      id="tenantName"
                      name="tenantName"
                      value={formData.tenantName}
                      onChange={handleChange}
                      placeholder="Enter tenant's full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="tenantEmail"
                      className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Gmail Address
                    </Label>
                    <Input
                      id="tenantEmail"
                      name="gmail"
                      value={formData.gmail}
                      onChange={handleChange}
                      placeholder="tenant@gmail.com"
                      type="email"
                    />
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    Invite Link
                  </Label>

                  <div className="flex items-center gap-2">
                    <div className="h-10 px-3 py-2 flex items-center rounded-md border bg-background text-sm font-mono text-foreground flex-1 truncate">
                      {inviteLink}
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      variant="default"
                      className="h-10 px-4"
                      onClick={() => {
                        toast.success("Invite link copied successfully!");
                        navigator.clipboard.writeText(inviteLink);
                      }}>
                      Copy
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Share this link with your tenant via email or messaging
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-2 p-4 border-t">
              <Button onClick={isCloseModal} variant="outline">
                Cancel
              </Button>
              {!inviteLink && (
                <Button onClick={handleSubmit} className="gap-2">
                  <Mail className="h-4 w-4" />
                  Send Invite
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>,
    modalRoot
  );
}
