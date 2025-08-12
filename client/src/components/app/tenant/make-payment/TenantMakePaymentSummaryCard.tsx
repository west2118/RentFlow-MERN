import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/constants/formatDate";
import { DollarSign } from "lucide-react";
import { useParams } from "react-router-dom";
import { Loading } from "../../Loading";
import type { PaymentType } from "@/types/paymentTypes";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/constants/fetchData";

const TenantMakePaymentSummaryCard = ({ token }: { token: string | null }) => {
  const { id } = useParams();

  const { data, isLoading } = useQuery<PaymentType>({
    queryKey: ["tenant-paymentMonth", id],
    queryFn: fetchData("http://localhost:8080/api/payment", token, true),
    enabled: !!token && !!id,
  });

  if (isLoading) return <Loading />;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Payment Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Current Balance</p>
                <p className="text-sm text-muted-foreground">
                  Due by {formatDate(data?.dueDate.toString()!)}
                </p>
              </div>
            </div>
            <p className="text-2xl font-bold">${data?.amount.toFixed(2)}</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Base Rent</span>
              <span>${data?.amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Late Fee</span>
              <span>${data?.lateFee?.toFixed(2)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-bold">
              <span>Total Due</span>
              <span>${data?.totalAmount?.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TenantMakePaymentSummaryCard;
