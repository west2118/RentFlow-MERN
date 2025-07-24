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
import { useUserStore } from "@/store/useUserStore";
import axios from "axios";
import { DollarSign } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Loading } from "../../Loading";
import type { PaymentType } from "@/types/paymentTypes";
import useFetchData from "@/hooks/useFetchData";

const TenantMakePaymentSummaryCard = ({ token }: { token: string | null }) => {
  const { id } = useParams();
  const {
    data: paymentData,
    loading: isLoading,
    error,
  } = useFetchData<PaymentType>(
    `http://localhost:8080/api/payment/${id}`,
    token,
    [id]
  );

  if (isLoading || !paymentData) {
    return <Loading />;
  }

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
                  Due by {formatDate(paymentData?.dueDate.toString())}
                </p>
              </div>
            </div>
            <p className="text-2xl font-bold">
              ${paymentData?.amount.toFixed(2)}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Base Rent</span>
              <span>${paymentData?.amount.toFixed(2)}</span>
            </div>
            {/* <div className="flex justify-between">
                <span className="text-muted-foreground">Late Fee</span>
                <span>$50.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Utilities</span>
                <span>$0.00</span>
              </div> */}
            <Separator className="my-2" />
            <div className="flex justify-between font-bold">
              <span>Total Due</span>
              <span>${paymentData?.amount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TenantMakePaymentSummaryCard;
