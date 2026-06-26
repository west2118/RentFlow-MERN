import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

type SummaryCardProps = {
  title: string;
  icon: React.ElementType;
  value: string | number | undefined;
  description?: string;
};

const SummaryCard = ({
  title,
  icon: Icon,
  value,
  description,
}: SummaryCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
