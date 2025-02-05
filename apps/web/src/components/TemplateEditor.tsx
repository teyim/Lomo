"use client";
import React, { useEffect, useState } from "react";
import * as fabric from "fabric";
import { LayoutWithElements } from "@/types";
import { useFabricCanvas } from "@/hooks";
import { canvasDimensions, canvasScaleFactor } from "@/constants";
import LayerPanel from "./panels/LayerPanel";
import ToolbarPanel from "./panels/ToolbarPanel";
import emptystateImage from "public/illustrations/abstract-art-6.svg";
import Image from "next/image";
import { Background, LayoutElementType } from "@repo/db";
import { useBlogThumbnailStore } from "@/store";
import { useShallow } from "zustand/shallow";

type TemplateEditorProps = {
  layoutData: LayoutWithElements[];
  backgroundData: Background[];
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

  desktopContent: " w-full h-full",
} as const;

export default function TemplateEditor({
  layoutData,
  backgroundData,
}: TemplateEditorProps) {


  const { selectedBackground, selectedLayout } = useBlogThumbnailStore(
    useShallow((state) => ({ selectedBackground: state.selectedBackground, selectedLayout: state.selectedLayout })),
  );

  const getRecommendedColorByAssetType = (assetType: LayoutElementType) => {
    return assetType === "HEADING"
      ? selectedBackground?.recommendedColors?.primary ?? "#000000"
      : assetType === "SUBHEADING"
        ? selectedBackground?.recommendedColors?.secondary ?? "#000000"
        : "#000000";
  };


  const [selectedElement, setSelectedElement] = useState<fabric.Text | null>(
    null,
  );
  const [selectedElementUpdates, setSelectedElementUpdates] =
    useState(defaultElementState);
  const [zoomLevel, setZoomLevel] = useState(1);

  const { canvasRef, addScaledText, exportCanvas, setBackgroundImage } =
    useFabricCanvas({
      originalWidth: canvasDimensions.width,
      originalHeight: canvasDimensions.height,
      scaleFactor: canvasScaleFactor,
      backgroundColor: "white",
    });

  // Initialize canvas with template assets
  useEffect(() => {
    console.log("useEeffect ran");
    if (!canvasRef.current) return;

    // Clear existing objects before adding new ones
    canvasRef.current.clear();

    if (selectedLayout) {

      selectedLayout?.elements.forEach((asset) => {
        const elementColor = getRecommendedColorByAssetType(asset.type)
        addScaledText(
          asset.label,
          (asset.fontSize ?? 0) * canvasScaleFactor,
          (asset.positionX ?? 0) * canvasScaleFactor,
          (asset.positionY ?? 0) * canvasScaleFactor,
          (asset.width ?? 0) * canvasScaleFactor,
          (asset.height ?? 0) * canvasScaleFactor,
          elementColor,
          asset.fontFamily ?? "Arial",
          Number(asset.fontWeight) ?? 100
        );
      });
    }


    // Check if a background image is already set
    if (selectedBackground?.imageUrl) {
      setBackgroundImage(selectedBackground.imageUrl);
    }

    // Refresh canvas after adding elements
    canvasRef.current.renderAll();
  }, [selectedBackground, selectedLayout]);

  // // Setup canvas event listeners
  // useEffect(() => {
  //   if (!canvasRef.current) return;

  //   const eventHandlers = {
  //     "selection:created": (event: fabric.IEvent) =>
  //       handleObjectSelection(event.selected?.[0] as fabric.Text),
  //     "selection:updated": (event: fabric.IEvent) =>
  //       handleObjectSelection(event.selected?.[0] as fabric.Text),
  //     "selection:cleared": clearSelectedElement,
  //   };

  //   // Attach event listeners
  //   Object.entries(eventHandlers).forEach(([event, handler]) => {
  //     canvasRef.current?.on(event as keyof fabric.CanvasEvents, handler);
  //   });

  //   // Cleanup event listeners
  //   return () => {
  //     Object.entries(eventHandlers).forEach(([event, handler]) => {
  //       canvasRef.current?.off(event as keyof fabric.CanvasEvents, handler);
  //     });
  //   };
  // }, [canvasRef]);

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
    updates: Partial<typeof selectedElementUpdates>,
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
      link.download = `hello.png`;
      link.href = dataURL || "";
      link.click();
    }
  };

  return (
    <>
      {/* Desktop Content */}
      <div className={styles.desktopContent}>
        <div className={styles.container}>
          <p className={styles.header}>
            <span className="font-bold">Template</span>: Create Thumbnail
          </p>

          <ToolbarPanel
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onExport={handleExport}
            zoomLevel={zoomLevel}
            backgroundData={backgroundData}
            layoutData={layoutData}
          />

          <div className={styles.mainContent}>
            {selectedBackground && <div className={styles.sidePanel}>
              <LayerPanel backgroundName={selectedBackground.name} />
            </div>}

            <div className={styles.canvasWrapper}>
              <canvas
                id="canvas"
                ref={canvasRef as unknown as React.LegacyRef<HTMLCanvasElement>}
              />
              {!selectedBackground && (
                <div className="absolute z-10 flex-col justify-center  ">
                  <div>
                    <Image
                      src={emptystateImage}
                      alt="empty state"
                      className="w-[300px] h-[300px] mx-auto"
                    />
                  </div>
                  <h5>
                    Please select a background and a corresponding layout to
                    start or Select a Template
                  </h5>
                </div>
              )}
            </div>

            {/* <div className={styles.sidePanel}>
              <SettingsPanel
                selectedElement={selectedElementUpdates}
                onUpdate={handleElementUpdate}
              />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
