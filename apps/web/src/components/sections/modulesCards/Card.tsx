import React from "react";
import Image from "next/image";
import { useModal } from "@/context/ModalContext";
import { useBlogThumbnailStore } from "@/store";
import { useShallow } from "zustand/shallow";
import { ThumbnailBackgroundData } from "@/types";
import { LayoutElement } from "@repo/db";

interface ModulesCardProps {
  cardType: "layout" | "background";
  name: string;
  imageUrl: string;
  elements?: LayoutElement[];
  recommendedColors?: ThumbnailBackgroundData["recommendedColors"];
}

function ModulesCard({
  cardType,
  name,
  imageUrl,
  elements,
  recommendedColors,
}: ModulesCardProps) {
  const { hideModal } = useModal();
  const { addBackground, addLayout, selectedBackground } =
    useBlogThumbnailStore(
      useShallow((state) => ({
        addBackground: state.addSelectedBackground,
        addLayout: state.addSelectedLayout,
        selectedBackground: state.selectedBackground,
      })),
    );

  const handleSelect = () => {
    if (cardType === "background" && recommendedColors) {
      addBackground({
        name,
        imageUrl,
        recommendedColors,
      });
    }
    if (cardType === "layout" && elements) {
      if (!selectedBackground) {
        alert("Please select a background before adding layout");
        return;
      }
      addLayout({
        name,
        imageUrl,
        elements,
      });
    }
    hideModal();
  };

  return (
    <div>
      <button
        className="ring-1 shadow-sm ring-gray-300 rounded-2xl w-[200px] h-[120px] hover:ring-2 hover:ring-slate-600 hover:shadow-lg flex justify-center cursor-pointer"
        onClick={handleSelect}
      >
        <Image
          src={imageUrl}
          alt={`thumbnail-${cardType}`}
          width={185}
          height={90}
          className="rounded-2xl h-full w-full"
        />
      </button>
      <div className="mt-2">
        <p className="font-semibold text-xs">{name}</p>
      </div>
    </div>
  );
}

export default ModulesCard;
