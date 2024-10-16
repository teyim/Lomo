"use client";

import React from "react";
import Card from "@/components/ui/card";
import Dropdown from "@/components/ui/dropdown";
import { thumbnailCategories } from "@/constants";
import { Template } from "@prisma/client";

type ThumbnailsSectionProps = {
  thumbnials: Template[];
};

function ThumbnailsSection({ thumbnials }: ThumbnailsSectionProps) {
  const handleSelect = (value: string) => {
    console.log("Selected:", value);
  };

  return (
    <div className="container p-12">
      <div className="p-6">
        <Dropdown
          placeholder="Select Category"
          options={thumbnailCategories}
          onSelect={(value: string) => handleSelect(value)}
          className="w-[150px] bg-gray-100 hover:bg-gray-200" // Custom styles
        />
        <div className="mt-10 grid lg:grid-cols-4 grid-cols-1 gap-4">
          {thumbnials.map((thumbnail, index) => (
            <Card
              key={thumbnail.id}
              title={thumbnail.name}
              imageUrl={thumbnail.img}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ThumbnailsSection;
