import React, { useMemo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchData } from "@/constants/fetchData";
import SummaryCardsGrid from "@/components/app/SummaryCardsGrid";
import { Home, CheckCircle2, DoorOpen, DollarSign } from "lucide-react";
import { pesoFormatter } from "@/lib/utils";

type SummaryDataType = {
  totalUnits: number;
  totalOccupiedUnits: number;
  totalAvailableUnits: number;
  percentageTotalOccupied: number;
  percentageTotalAvailable: number;
  totalMonthRent: number;
  totalUnitsInPayment: number;
};

const LandlordDashboardSummaryCards = () => {
  const { data } = useSuspenseQuery<SummaryDataType>({
    queryKey: ["landlord-dashboard-summary"],
    queryFn: fetchData("http://localhost:8080/api/landlord-dashboard/summary"),
  });

  const summaryCardsData = useMemo(() => [
    {
      title: "Total Units",
      icon: Home,
      value: data.totalUnits,
      description: "Total properties you manage",
    },
    {
      title: "Occupied",
      icon: CheckCircle2,
      value: data.totalOccupiedUnits,
      description: `${data.percentageTotalOccupied.toFixed(2)}% occupancy rate`,
    },
    {
      title: "Available",
      icon: DoorOpen,
      value: data.totalAvailableUnits,
      description: `${data.percentageTotalAvailable.toFixed(2)}% available rate`,
    },
    {
      title: "Revenue",
      icon: DollarSign,
      value: pesoFormatter.format(data.totalMonthRent),
      description: `From ${data.totalUnitsInPayment} unit payments`,
    },
  ], [data]);

  return <SummaryCardsGrid cards={summaryCardsData} />;
};

export default LandlordDashboardSummaryCards;
