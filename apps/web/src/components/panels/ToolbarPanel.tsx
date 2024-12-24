import { Download, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ToolbarPanelProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onExport: () => void;
  zoomLevel: number;
}

export default function ToolbarPanel({
  onZoomIn,
  onZoomOut,
  onExport,
  zoomLevel,
}: ToolbarPanelProps) {
  return (
    <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-slate-800 backdrop-blur-sm rounded-xl shadow-lg text-white ring-1 ring-white p-2">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onZoomOut}
          className="h-8 w-8"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <span className="text-xs w-12 text-center">
          {Math.round(zoomLevel * 100)}%
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={onZoomIn}
          className="h-8 w-8"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
      </div>
      <div className="w-px h-6 bg-white/35" />
      <Button
        variant="ghost"
        size="icon"
        onClick={onExport}
        className="h-8 w-8"
      >
        <Download className="h-4 w-4" />
      </Button>
    </div>
  );
}
