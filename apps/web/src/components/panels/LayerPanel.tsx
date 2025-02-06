import { LayoutElement } from ".prisma/client";
import { Separator } from "@/components/ui/separator";
import { useBlogThumbnailStore } from "@/store";
import { LayoutCardProps, ThumbnailBackgroundData } from "@/types";
import { FileImage, FileText, Type } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

interface LayerPanelProps {
  background: ThumbnailBackgroundData | null
  layoutElements: LayoutElement[] | null
}

export default function LayerPanel({ background, layoutElements }: LayerPanelProps) {


  const baseLayerItemStyles =
    "flex items-center justify-between p-2 rounded cursor-pointer hover:bg-gray-100/20";

  return (
    <div className="z-50 absolute left-2 md:bottom-2 lg:top-[35%] w-[170px] h-[250px] bg-slate-800 backdrop-blur-sm rounded-xl shadow-lg text-white ring-1 ring-white">
      <h6 className="p-3 font-mono text-sm font-bold">Layers</h6>
      <Separator className="bg-white/35" />
      <div className="space-y-2 p-2 h-[210px] overflow-y-auto">
        <div className="flex items-center space-x-2">
          <span>
            <FileImage className="h-4 w-4" />
          </span>
                <span className="text-xs font-medium truncate w-[130px]">
            {background?.name}
                </span>
        </div>
        {layoutElements?.map((layoutElement) => (
          <div className="flex items-center space-x-2" key={layoutElement.id}>
            <span>
              <Type className="h-4 w-4" />
            </span>
            <span className="text-xs font-medium truncate w-[130px]">
              {layoutElement?.type.toLocaleLowerCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
