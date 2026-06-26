import React, { useMemo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchData } from "@/constants/fetchData";
import SummaryCardsGrid from "@/components/app/SummaryCardsGrid";
import { DollarSign, AlertCircle } from "lucide-react";

type SummaryDataType = {
  totalDue: {
    totalAmount: number;
    totalLength: number;
  };
  totalPending: {
    totalAmount: number;
    totalLength: number;
  };
  totalPaid: {
    totalAmount: number;
    totalLength: number;
  };
  totalOverdue: {
    totalAmount: number;
    totalLength: number;
  };
};

const LandlordPaymentHistorySummaryCards = () => {
  const { data } = useSuspenseQuery<SummaryDataType>({
    queryKey: ["landlord-payment-history-summary"],
    queryFn: fetchData("http://localhost:8080/api/landlord-payment-history-summary"),
  });

  const summaryCardsData = useMemo(() => [
    {
      title: "Total Month Due",
      icon: DollarSign,
      value: `$${(data?.totalDue?.totalAmount ?? 0).toFixed(2)}`,
      description: `From ${data?.totalDue?.totalLength ?? 0} total units`,
    },
    {
      title: "Total Collected",
      icon: DollarSign,
      value: `$${(data?.totalPaid?.totalAmount ?? 0).toFixed(2)}`,
      description: `From ${data?.totalPaid?.totalLength ?? 0} completed payment`,
    },
    {
      title: "Pending Balance",
      icon: AlertCircle,
      value: `$${(data?.totalPending?.totalAmount ?? 0).toFixed(2)}`,
      description: `From ${data?.totalPending?.totalLength ?? 0} pending payment`,
    },
    {
      title: "Overdue Balance",
      icon: AlertCircle,
      value: `$${(data?.totalOverdue?.totalAmount ?? 0).toFixed(2)}`,
      description: `From ${data?.totalOverdue?.totalLength ?? 0} overdue payment`,
    },
  ], [data]);

  return <SummaryCardsGrid cards={summaryCardsData} />;
};

export default LandlordPaymentHistorySummaryCards;
