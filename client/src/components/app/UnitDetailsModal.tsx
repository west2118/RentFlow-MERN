import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useUserStore } from "@/store/useUserStore";
import type { UnitType } from "@/types/unitTypes";
import type { UserType } from "@/types/userTypes";
import axios from "axios";
import {
  X,
  Home,
  Bed,
  Bath,
  Ruler,
  MapPin,
  DollarSign,
  CheckCircle2,
  Wrench,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";
import DataLoading from "./DataLoading";

type UnitDetailsModalProps = {
  isModalOpen: boolean;
  isCloseModal: () => void;
  unit: UnitType;
};

export function UnitDetailsModal({
  isModalOpen,
  isCloseModal,
  unit,
}: UnitDetailsModalProps) {
  const token = useUserStore((state) => state.userToken);

  const [data, setData] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token || !unit?.tenantUid) return;

    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          `http://localhost:8080/api/specific-user/${unit.tenantUid}`,
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
  }, [unit?.tenantUid, token]);

  useEffect(() => {
    if (!unit.tenantUid) {
      setLoading(false);
    }
  }, [unit?.tenantUid]);

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

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div
      onClick={isCloseModal}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-lg p-6 border-b sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <Home className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Unit Details</h2>
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
          <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto hide-scrollbar">
            {/* Unit Photo */}
            <div className="rounded-lg overflow-hidden h-82 bg-gray-100">
              <img
                src={unit?.photos}
                alt="Unit photo"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Home className="h-5 w-5" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Unit Name</span>
                    <span className="font-medium text-end">{unit?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Unit Number</span>
                    <span className="font-medium text-end">
                      {unit?.unitNumber}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Floor</span>
                    <span className="font-medium text-end">{unit?.floor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type</span>
                    <span className="font-medium text-end">{unit?.type}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Specifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Ruler className="h-5 w-5" />
                    Specifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Bed className="h-4 w-4" /> Bedrooms
                    </span>
                    <span className="font-medium text-end">
                      {unit?.bedrooms}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Bath className="h-4 w-4" /> Bathrooms
                    </span>
                    <span className="font-medium text-end">
                      {unit?.bathrooms}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Size</span>
                    <span className="font-medium text-end">
                      {unit?.size} sqft
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Financial Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <DollarSign className="h-5 w-5" />
                    Financial
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monthly Rent</span>
                    <span className="font-medium text-end">
                      ${unit?.rentAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span className="inline-flex items-center gap-1 font-medium">
                      {unit?.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tenant</span>
                    <span className="inline-flex items-center gap-1 font-medium">
                      {data
                        ? `${data?.firstName} ${data?.lastName}`
                        : "No tenant assigned"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">{unit?.address}</p>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="h-5 w-5" />
                  Amenities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {unit?.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="px-3 py-1 bg-muted rounded-full text-sm">
                      {amenity}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{unit?.notes}</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>,
    modalRoot
  );
}
