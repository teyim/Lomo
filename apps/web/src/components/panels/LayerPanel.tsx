import { Separator } from "@/components/ui/separator";
import { TemplateAsset } from "@/types";
import { Asset } from "@prisma/client";

interface LayerPanelProps {
  assets: TemplateAsset[];
}

export default function LayerPanel({ assets }: LayerPanelProps) {
  return (
    <div className="absolute left-2 top-[35%] w-[230px] h-[250px] bg-slate-800 backdrop-blur-sm rounded-xl shadow-lg text-white ring-1 ring-white">
      <h6 className="p-3 font-mono text-sm font-bold">Layers</h6>
      <Separator className="bg-white/35" />
      <div className="space-y-2 p-2 h-[210px] overflow-y-auto">
        {assets?.map((asset, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 hover:bg-gray-100/20 rounded cursor-pointer"
          >
            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium truncate w-[130px]">
                {asset.defaultText}
              </span>
            </div>
            <div className="text-xs text-gray-500">{asset.fontFamily}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
