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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import {
  FileText,
  Calendar as CalendarIcon,
  DollarSign,
  ChevronDown,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "@/hooks/useForm";
import { format } from "date-fns";
import axios from "axios";
import { useUserStore } from "@/store/useUserStore";
import { toast } from "react-toastify";
import LandlordDocumentUploadCard from "@/components/app/landlord/LandlordDocumentUploadCard";

type FormData = {
  leaseStart: Date | undefined;
  leaseEnd: Date | undefined;
  rentAmount: number;
  securityDeposit: number;
  paymentSchedule: string;
  notes: string;
};

export function LandlordCreateLease() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useUserStore((state) => state.userToken);
  const { formData, handleChange, setField } = useForm<FormData>({
    leaseStart: undefined,
    leaseEnd: undefined,
    rentAmount: 0,
    securityDeposit: 0,
    paymentSchedule: "",
    notes: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:8080/api/lease/${id}`,
        {
          ...formData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/landlord/units");
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Create New Lease</h2>
          <p className="text-muted-foreground">Enter lease agreement details</p>
        </div>
        <Button variant="outline">
          <FileText className="h-4 w-4 mr-2" />
          View All Leases
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lease Information Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Lease Details</CardTitle>
            <CardDescription>
              Enter all required lease information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="paymentSchedule">Payment Schedule</Label>
                <Select
                  name="paymentSchedule"
                  value={formData.paymentSchedule}
                  onValueChange={(value) => setField("paymentSchedule", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select schedule" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                    <SelectItem value="Quarterly">Quarterly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Lease Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {formData.leaseStart
                        ? format(formData.leaseStart, "PPP")
                        : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.leaseStart}
                      onSelect={(value) => setField("leaseStart", value)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>Lease End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {formData.leaseEnd
                        ? format(formData.leaseEnd, "PPP")
                        : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.leaseEnd}
                      onSelect={(value) => setField("leaseEnd", value)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rentAmount">Rent Amount</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    id="rentAmount"
                    type="number"
                    name="rentAmount"
                    value={formData.rentAmount}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="securityDeposit">Security Deposit</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    id="securityDeposit"
                    type="number"
                    name="securityDeposit"
                    value={formData.securityDeposit}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="pl-8"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Enter any additional lease terms or conditions"
                rows={3}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Create Lease</Button>
          </CardFooter>
        </Card>

        {/* Document Upload Section */}
        <LandlordDocumentUploadCard />
      </div>
    </form>
  );
}
