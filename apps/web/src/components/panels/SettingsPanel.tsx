import React from "react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  Type,
  Palette,
  X,
  XIcon,
} from "lucide-react";
import { supportedFonts } from "@/constants";
import { constainsSubstring } from "@/lib/utils";
import { SelectedElement } from "@/types";
import { Button } from "../ui/button";

interface SettingsPanelProps {
  selectedElement: any;
  onUpdate: (updates: Partial<any>) => void;
}

export default function SettingsPanel({
  selectedElement,
  onUpdate,
}: SettingsPanelProps) {
  if (
    !selectedElement ||
    selectedElement.width === 0 ||
    selectedElement.height === 0
  ) {
    return (
      <div className="z-50 absolute right-2 md:bottom-2 lg:top-[35%] w-[230px] h-[250px] bg-slate-800 backdrop-blur-sm rounded-xl shadow-lg text-white ring-1 ring-white">
        <h6 className="p-3 font-mono text-sm font-bold">Settings</h6>
        <Separator className="bg-white/35" />
        <div className="flex items-center justify-center h-[210px]">
          <p className="text-xs text-gray-400">
            Select an element to customize
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute right-2 md:bottom-2 lg:top-[35%] w-[230px] h-[250px] bg-slate-800 backdrop-blur-sm rounded-xl shadow-lg text-white ring-1 ring-white">
      <h6 className="p-3 font-mono text-sm font-bold">Settings</h6>
      <Separator className="bg-white/35" />
      <div className="space-y-2 p-2 h-[210px] overflow-y-auto">
        {selectedElement.type === "textbox" && (
          <>
            {/* Text Input */}
            <div className="flex items-center justify-between p-2 hover:bg-gray-100/20 rounded">
              <div className="flex items-center space-x-2">
                <Type className="h-4 w-4 text-gray-400" />
                <span className="text-xs font-medium">Text</span>
              </div>
              <Input
                value={selectedElement.text}
                onChange={(e) => onUpdate({ text: e.target.value })}
                className="h-6 w-24 bg-slate-700 border-slate-600 text-xs"
              />
            </div>

            {/* Font Family */}
            <div className="flex items-center justify-between p-2 hover:bg-gray-100/20 rounded">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-medium">Font</span>
              </div>
              <Select
                value={supportedFonts.find((ele) =>
                  constainsSubstring(ele, selectedElement?.fontFamily),
                )}
                onValueChange={(value) => onUpdate({ fontFamily: value })}
              >
                <SelectTrigger className="h-6 w-24 bg-slate-700 border-slate-600 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="">
                  {supportedFonts.map((font) => (
                    <SelectItem key={font} value={font} className="text-xs">
                      {font}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Font Size */}
            <div className="flex items-center justify-between p-2 hover:bg-gray-100/20 rounded">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-medium">Size</span>
              </div>
              <Input
                type="number"
                value={selectedElement.fontSize}
                onChange={(e) => onUpdate({ fontSize: Number(e.target.value) })}
                className="h-6 w-16 bg-slate-700 border-slate-600 text-xs"
              />
            </div>

            {/* Color */}
            <div className="flex items-center justify-between p-2 hover:bg-gray-100/20 rounded">
              <div className="flex items-center space-x-2">
                <Palette className="h-4 w-4 text-gray-400" />
                <span className="text-xs font-medium">Color</span>
              </div>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={selectedElement.fill}
                  onChange={(e) => onUpdate({ fill: e.target.value })}
                  className="w-6 h-6 p-0.5 bg-slate-700 border-slate-600"
                />
                <Input
                  value={selectedElement.fill}
                  onChange={(e) => onUpdate({ fill: e.target.value })}
                  className="h-6 w-20 bg-slate-700 border-slate-600 text-xs"
                  placeholder="#000000"
                />
              </div>
            </div>

            {/* Text Alignment */}
            <div className="flex items-center justify-between p-2 hover:bg-gray-100/20 rounded">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-medium">Align</span>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => onUpdate({ textAlign: "left" })}
                  className={`p-1 rounded ${selectedElement.textAlign === "left" ? "bg-white/20" : "hover:bg-white/10"}`}
                >
                  <AlignLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onUpdate({ textAlign: "center" })}
                  className={`p-1 rounded ${selectedElement.textAlign === "center" ? "bg-white/20" : "hover:bg-white/10"}`}
                >
                  <AlignCenter className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onUpdate({ textAlign: "right" })}
                  className={`p-1 rounded ${selectedElement.textAlign === "right" ? "bg-white/20" : "hover:bg-white/10"}`}
                >
                  <AlignRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        )}

        {selectedElement.type === "image" && (
          <>
            {/* Image Source */}
            <div className="flex items-center justify-between p-2 hover:bg-gray-100/20 rounded">
              <Button className="w-full bg-white text-gray-900 hover:bg-white">
                Add image
              </Button>
            </div>

            {/* Image Scale */}
            <div className="flex items-center justify-between p-2 hover:bg-gray-100/20 rounded">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-medium">Scale</span>
              </div>
              <div className="flex gap-2 items-center">
                <Input
                  type="number"
                  value={selectedElement.width}
                  onChange={(e) => onUpdate({ width: Number(e.target.value) })}
                  className="h-6 w-12 bg-slate-700 border-slate-600 text-xs p-0 px-1"
                  placeholder="X"
                />
                <span>
                  <XIcon size={15} />
                </span>
                <Input
                  type="number"
                  value={selectedElement.height}
                  onChange={(e) => onUpdate({ height: Number(e.target.value) })}
                  className="h-6 w-12 bg-slate-700 border-slate-600 text-xs p-0 px-1"
                  placeholder="Y"
                />
              </div>
            </div>

            {/* Image Rotation */}
            <div className="flex items-center justify-between p-2 hover:bg-gray-100/20 rounded">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-medium">Rotation</span>
              </div>
              <Input
                type="number"
                value={selectedElement.angle}
                onChange={(e) => onUpdate({ angle: Number(e.target.value) })}
                className="h-6 w-16 bg-slate-700 border-slate-600 text-xs"
              />
            </div>

            {/* Image Opacity */}
            <div className="flex items-center justify-between p-2 hover:bg-gray-100/20 rounded">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-medium">Opacity</span>
              </div>
              <Input
                type="number"
                value={selectedElement.opacity}
                onChange={(e) => onUpdate({ opacity: Number(e.target.value) })}
                className="h-6 w-16 bg-slate-700 border-slate-600 text-xs"
                min={0}
                max={1}
                step={0.1}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
