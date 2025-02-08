import { Background } from "@repo/db";
import React from "react";
import { LayoutWithElements } from "@/types";
import ModulesCard from "./Card";

type ModulesCardsProps = {
  backgrounds?: Background[];
  layouts?: LayoutWithElements[];
};
function ModulesCards({ backgrounds, layouts }: ModulesCardsProps) {
  if (backgrounds) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {backgrounds?.map((background) => (
          <ModulesCard
            cardType="background"
            imageUrl={background?.imageUrl}
            name={background.name}
            recommendedColors={background.recommendedColors as any}
            key={background.id}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {layouts?.map((layout) => (
        <ModulesCard
          cardType="layout"
          imageUrl={layout?.previewimage}
          name={layout.name}
          elements={layout.elements}
          key={layout.id}
        />
      ))}
    </div>
  );
}

export default ModulesCards;
