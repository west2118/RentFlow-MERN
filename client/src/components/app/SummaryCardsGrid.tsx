import React from "react";
import SummaryCard from "./SummaryCard";

type SummaryCardData = {
  title: string;
  icon: React.ElementType;
  value: string | number | undefined;
  description?: string;
};

type SummaryCardsGridProps = {
  cards: SummaryCardData[];
};

const SummaryCardsGrid = ({ cards }: SummaryCardsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <SummaryCard
          key={index}
          title={card.title}
          icon={card.icon}
          value={card.value}
          description={card.description}
        />
      ))}
    </div>
  );
};

export default SummaryCardsGrid;
