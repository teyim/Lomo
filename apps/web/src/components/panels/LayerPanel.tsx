import { Separator } from "@/components/ui/separator";
import { TemplateAsset } from "@/types";
import { Asset } from "@prisma/client";
import { twMerge } from "tailwind-merge";
import * as fabric from "fabric";

interface LayerPanelProps {
  assets:
    | (fabric.Textbox<Partial<fabric.FabricText>> & {
        selected: boolean;
      })[]
    | undefined;
}

export default function LayerPanel({ assets }: LayerPanelProps) {
  const baseLayerItemStyles =
    "flex items-center justify-between p-2 rounded cursor-pointer hover:bg-gray-100/20";

  console.log(assets);

  return (
    <div className="z-50 absolute left-2 md:bottom-2 lg:top-[35%] w-[230px] h-[250px] bg-slate-800 backdrop-blur-sm rounded-xl shadow-lg text-white ring-1 ring-white">
      <h6 className="p-3 font-mono text-sm font-bold">Layers</h6>
      <Separator className="bg-white/35" />
      <div className="space-y-2 p-2 h-[210px] overflow-y-auto">
        {assets?.map((asset, index) => {
          return (
            <div
              key={index}
              className={twMerge(
                baseLayerItemStyles,
                asset.selected && "bg-gray-100/30 hover:bg-gray-100/30"
              )}
            >
              <div className="flex items-center space-x-2">
                <span className="text-xs font-medium truncate w-[130px]">
                  {asset.text}
                </span>
              </div>
              <div className="text-xs text-slate-400">{asset.fontFamily}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
