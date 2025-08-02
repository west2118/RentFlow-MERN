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
import { Calendar as CalendarIcon, DollarSign, Loader } from "lucide-react";
import { format } from "date-fns";

const LandlordLeaseFormCard = ({
  formData,
  setField,
  handleChange,
  isLoading,
}: {
  formData: any;
  setField: (name: string, value: any) => void;
  handleChange: (e: any) => void;
  isLoading: boolean;
}) => {
  return (
    <Card className="lg:col-span-2 h-fit">
      <CardHeader>
        <CardTitle>Lease Details</CardTitle>
        <CardDescription>Enter all required lease information</CardDescription>
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
        <Button disabled={isLoading} variant="outline">
          Cancel
        </Button>
        <Button disabled={isLoading}>
          {isLoading ? <Loader className="animate-spin h-5 w-5" /> : ""}Create
          Lease
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LandlordLeaseFormCard;
