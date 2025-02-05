import { Separator } from "@/components/ui/separator";
import { useCanvasAssetsStore } from "@/store";
import { FileImage } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

interface LayerPanelProps {
  backgroundName: string
}

export default function LayerPanel({ backgroundName }: LayerPanelProps) {

  const { assets } = useCanvasAssetsStore(
    useShallow((state) => ({ assets: state.assets })),
  );

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
            {backgroundName}
                </span>
              </div>

      </div>
    </div>
  );
}
