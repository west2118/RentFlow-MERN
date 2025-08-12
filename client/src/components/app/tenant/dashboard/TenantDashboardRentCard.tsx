import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatDate } from "@/constants/formatDate";
import { statusPaymentStyle } from "@/constants/statusPaymentStyle";
import { useUserStore } from "@/store/useUserStore";
import type { PaymentType } from "@/types/paymentTypes";
import { CheckCircle2, DollarSign } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReceiptModal } from "../../ReceiptModal";
import { fetchData } from "@/constants/fetchData";
import { useQuery } from "@tanstack/react-query";
import type { ReceiptType } from "@/types/receiptTypes";

const TenantDashboardRentCard = ({ payment }: { payment: PaymentType }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const token = useUserStore((state) => state.userToken);

  const { data } = useQuery<ReceiptType>({
    queryKey: ["tenant-receipt", payment?._id],
    queryFn: fetchData("http://localhost:8080/api/receipt", token, true),
    enabled: !!token && !!payment?._id,
  });

  console.log("Receipt: ", data);
  console.log("Payment: ", payment);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Rent Status</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex-1">
        <div className="text-xl font-bold mb-2">
          {payment?.lateFee
            ? `$${payment?.amount.toFixed(2)} + $${payment?.lateFee.toFixed(2)}`
            : `$${payment?.amount.toFixed(2)}`}
        </div>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-muted-foreground">Due Date</span>
          <span>
            {payment?.dueDate ? formatDate(payment?.dueDate.toString()) : "N/A"}
          </span>
        </div>
        <div className="flex justify-between text-sm mb-3">
          <span className="text-muted-foreground">Status</span>
          {statusPaymentStyle(payment?.status)}
        </div>
        <Progress
          value={payment?.status === "Paid" ? 100 : 0}
          className="h-2"
        />
      </CardContent>
      <CardFooter className="">
        {payment?.status === "Paid" || (data && data?.status !== "Rejected") ? (
          <Button onClick={() => setIsModalOpen(true)} className="w-full ">
            View Receipt
          </Button>
        ) : (
          <Button
            onClick={() => navigate(`/tenant/make-payment/${payment?._id}`)}
            className="w-full">
            Make Payment
          </Button>
        )}
      </CardFooter>

      {isModalOpen && (
        <ReceiptModal
          isModalOpen={isModalOpen}
          isCloseModal={() => setIsModalOpen(false)}
          payment={payment}
        />
      )}
    </Card>
  );
};

export default TenantDashboardRentCard;
