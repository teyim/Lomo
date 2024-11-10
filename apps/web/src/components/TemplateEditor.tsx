"use client";
import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import { Template, TemplateAsset } from "@/types";
import { getFontWeight } from "@/lib/utils";
import { useFabricCanvas } from "@/hooks";
import { canvasScaleFactor } from "@/constants";
import SettingsPanel from "./panels/SettingsPanel";
import LayerPanel from "./panels/LayerPanel";
import ToolbarPanel from "./panels/ToolbarPanel";

type TemplateEditorProps = {
  templateData: Template;
};

// Default state for selected element
const defaultElementState = {
  text: "",
  fontFamily: "",
  fontSize: 0,
  fill: "",
  textAlign: "center",
  width: 0,
  height: 0,
  left: 0,
  top: 0,
  fontWeight: 100,
};

// Common styles
const styles = {
  container: "fixed inset-0 w-screen h-screen overflow-hidden",
  header: "absolute top-4 left-6 z-10",
  mainContent:
    "w-full h-full flex items-center justify-between overflow-hidden",
  sidePanel: "h-full overflow-y-auto",
  canvasWrapper: "flex-1 h-full flex justify-center items-center",
  mobileMessage:
    "hidden md:hidden w-full h-screen bg-slate-800 text-white flex items-center justify-center text-center px-4",
  desktopContent: "hidden md:block w-full h-full",
} as const;

export default function TemplateEditor({ templateData }: TemplateEditorProps) {
  console.log(templateData);
  const [selectedElement, setSelectedElement] = useState<fabric.Text | null>(
    null
  );
  const [selectedElementUpdates, setSelectedElementUpdates] =
    useState(defaultElementState);
  const [zoomLevel, setZoomLevel] = useState(1);

  const { canvasRef, addScaledText, exportCanvas } = useFabricCanvas({
    originalWidth: templateData.width,
    originalHeight: templateData.height,
    scaleFactor: canvasScaleFactor,
    backgroundColor: templateData.backgroundColor,
  });

  // Initialize canvas with template assets
  useEffect(() => {
    if (!canvasRef.current) return;

    templateData.assets.forEach((asset) => {
      addScaledText(
        asset.defaultText,
        asset.fontSize,
        asset.positionX,
        asset.positionY,
        asset.width,
        asset.height,
        asset.color,
        asset.fontFamily,
        asset.fontWeight
      );
    });
  }, []);

  // Setup canvas event listeners
  useEffect(() => {
    if (!canvasRef.current) return;

    const eventHandlers = {
      "selection:created": (event: fabric.IEvent) =>
        handleObjectSelection(event.selected?.[0] as fabric.Text),
      "selection:updated": (event: fabric.IEvent) =>
        handleObjectSelection(event.selected?.[0] as fabric.Text),
      "selection:cleared": clearSelectedElement,
    };

    // Attach event listeners
    Object.entries(eventHandlers).forEach(([event, handler]) => {
      canvasRef.current?.on(event as keyof fabric.CanvasEvents, handler);
    });

    // Cleanup event listeners
    return () => {
      Object.entries(eventHandlers).forEach(([event, handler]) => {
        canvasRef.current?.off(event as keyof fabric.CanvasEvents, handler);
      });
    };
  }, [canvasRef]);

  const handleObjectSelection = (object: fabric.Text) => {
    if (!object || object.type !== "textbox") {
      clearSelectedElement();
      return;
    }

    setSelectedElement(object);

    setSelectedElementUpdates({
      text: object.text || "",
      fontFamily: object.fontFamily || "",
      fontSize: object.fontSize || 0,
      fill: object.fill?.toString() || "",
      textAlign: object.textAlign || "center",
      width: object.width || 0,
      height: object.height || 0,
      left: object.left || 0,
      top: object.top || 0,
      fontWeight: object.fontWeight as number,
    });
  };

  const clearSelectedElement = () => {
    setSelectedElement(null);
    setSelectedElementUpdates(defaultElementState);
  };

  const handleElementUpdate = (
    updates: Partial<typeof selectedElementUpdates>
  ) => {
    if (selectedElement) {
      selectedElement.set(updates);
      canvasRef.current?.renderAll();
      setSelectedElementUpdates((prev) => ({ ...prev, ...updates }));
    }
  };

  const handleZoomIn = () => {
    if (canvasRef.current && zoomLevel < 2) {
      const newZoom = zoomLevel + 0.1;
      setZoomLevel(newZoom);
      canvasRef.current.setZoom(newZoom);
      canvasRef.current.renderAll();
    }
  };

  const handleZoomOut = () => {
    if (canvasRef.current && zoomLevel > 0.5) {
      const newZoom = zoomLevel - 0.1;
      setZoomLevel(newZoom);
      canvasRef.current.setZoom(newZoom);
      canvasRef.current.renderAll();
    }
  };

  const handleExport = () => {
    if (canvasRef.current) {
      const dataURL = exportCanvas();
      const link = document.createElement("a");
      link.download = `${templateData.name}.png`;
      link.href = dataURL || "";
      link.click();
    }
  };

  return (
    <>
      {/* Mobile Message */}
      <div className={styles.mobileMessage}>
        <h2 className="text-2xl font-semibold">
          Not available on mobile devices
        </h2>
      </div>

      {/* Desktop Content */}
      <div className={styles.desktopContent}>
        <div className={styles.container}>
          <p className={styles.header}>
            <span className="font-bold">Template</span>: {templateData.name}
          </p>

          <ToolbarPanel
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onExport={handleExport}
            zoomLevel={zoomLevel}
          />

          <div className={styles.mainContent}>
            <div className={styles.sidePanel}>
              <LayerPanel assets={canvasRef.current?.getObjects() as any} />
            </div>

            <div className={styles.canvasWrapper}>
              <canvas
                id="canvas"
                ref={canvasRef as unknown as React.LegacyRef<HTMLCanvasElement>}
              />
            </div>

            <div className={styles.sidePanel}>
              <SettingsPanel
                selectedElement={selectedElementUpdates}
                onUpdate={handleElementUpdate}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
