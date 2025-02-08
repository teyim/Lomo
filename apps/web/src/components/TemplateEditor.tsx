"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import * as fabric from "fabric";
import { LayoutWithElements, SelectedElement, SupportedFonts } from "@/types";
import { useFabricCanvas } from "@/hooks";
import { canvasDimensions, defaultImageElementState, defaultTextElementState } from "@/constants";
import LayerPanel from "./panels/LayerPanel";
import ToolbarPanel from "./panels/ToolbarPanel";
import emptystateImage from "public/illustrations/abstract-art-6.svg";
import Image from "next/image";
import { Background, LayoutElementType } from "@repo/db";
import { useBlogThumbnailStore } from "@/store";
import { useShallow } from "zustand/shallow";
import { lexend } from "@/app/layout";
import { calculateScaleFactor, getOptimisedFontFamilyByName, scaleCanvas } from "@/lib/utils";
import SettingsPanel from "./panels/SettingsPanel";

type TemplateEditorProps = {
  layoutData: LayoutWithElements[];
  backgroundData: Background[];
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

  const { selectedBackground, selectedLayout, scaleFactor, setScaleFactor } = useBlogThumbnailStore(
    useShallow((state) => ({ selectedBackground: state.selectedBackground, selectedLayout: state.selectedLayout, scaleFactor: state.scaleFactor, setScaleFactor: state.setScaleFactor })),
  );

  const getRecommendedColorByAssetType = (assetType: LayoutElementType) => {
    return assetType === "HEADING"
      ? selectedBackground?.recommendedColors?.primary ?? "#000000"
      : assetType === "SUBHEADING"
        ? selectedBackground?.recommendedColors?.secondary ?? "#000000"
        : "#000000";
  };

  const [selectedElement, setSelectedElement] = useState<fabric.Object | null>(null);
  const [selectedElementUpdates, setSelectedElementUpdates] = useState<SelectedElement>(defaultTextElementState)
  const [zoomLevel, setZoomLevel] = useState(1);

  const { canvasRef, addScaledText, exportCanvas, setBackgroundImage, addImage } =
    useFabricCanvas({
      originalWidth: canvasDimensions.width * scaleFactor.canvas,
      originalHeight: canvasDimensions.height * scaleFactor.canvas,
      scaleFactor: scaleFactor,
      backgroundColor: "white",
    });

  // Initialize canvas with template assets
  useEffect(() => {

    if (!canvasRef.current) return;

    // Clear existing objects before adding new ones
    canvasRef.current.clear();

    if (selectedLayout) {

      selectedLayout?.elements.forEach((asset) => {
        if (asset.type != "IMAGE") {
          const elementColor = getRecommendedColorByAssetType(asset.type)
          addScaledText(
            asset.label,
            (asset.fontSize ?? 0) * scaleFactor.text,
            (asset.positionX ?? 0) * scaleFactor.text,
            (asset.positionY ?? 0) * scaleFactor.text,
            (asset.width ?? 0) * scaleFactor.text,
            (asset.height ?? 0) * scaleFactor.text,
            elementColor,
            getOptimisedFontFamilyByName(asset?.fontFamily?.toLocaleLowerCase() as SupportedFonts),
            Number(asset.fontWeight) ?? 100
          );
        }
        else {
          addImage(asset)
        }

      });
    }


    // Check if a background image is already set
    if (selectedBackground?.imageUrl) {
      setBackgroundImage(selectedBackground.imageUrl);
    }


  }, [selectedBackground, selectedLayout]);

  console.log(scaleFactor)
  // Update scale factor on window resize
  useLayoutEffect(() => {
    console.log(window.innerWidth)
    const handleResize = () => {
      const newScaleFactor = calculateScaleFactor(window.innerWidth);
      setScaleFactor(newScaleFactor);
    }
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Setup canvas event listeners
  useEffect(() => {
    if (!canvasRef.current) return;

    const eventHandlers = {
      "selection:created": (event: fabric.IEvent) =>
        handleObjectSelection(event.selected?.[0] as fabric.Object),
      "selection:updated": (event: fabric.IEvent) =>
        handleObjectSelection(event.selected?.[0] as fabric.Object),
      "selection:cleared": clearSelectedElement,
    };

    Object.entries(eventHandlers).forEach(([event, handler]) => {
      canvasRef.current?.on(event as keyof fabric.CanvasEvents, handler);
    });

    return () => {
      Object.entries(eventHandlers).forEach(([event, handler]) => {
        canvasRef.current?.off(event as keyof fabric.CanvasEvents, handler);
      });
    };
  }, [canvasRef]);

  const handleObjectSelection = (object: fabric.Object | null) => {
    if (!object) {
      clearSelectedElement();
      return;
    }

    setSelectedElement(object);

    if (object.type === "textbox") {
      const textObject = object as fabric.Textbox;
      setSelectedElementUpdates({
        ...defaultTextElementState,
        text: textObject.text || "",
        fontFamily: textObject.fontFamily || "",
        fontSize: textObject.fontSize || 0,
        fill: textObject.fill?.toString() || "",
        textAlign: textObject.textAlign || "center",
        width: textObject.width || 0,
        height: textObject.height || 0,
        left: textObject.left || 0,
        top: textObject.top || 0,
        fontWeight: textObject.fontWeight as number,
      });
    } else if (object.type === "image") {

      const imageObject = object as fabric.Image;
      setSelectedElementUpdates({
        ...defaultImageElementState,
        src: imageObject.getSrc() || "",
        width: imageObject.width || 0,
        height: imageObject.height || 0,
        left: imageObject.left || 0,
        top: imageObject.top || 0,
        scaleX: imageObject.scaleX || 1,
        scaleY: imageObject.scaleY || 1,
        angle: imageObject.angle || 0,
        opacity: imageObject.opacity || 1,
        flipX: imageObject.flipX || false,
        flipY: imageObject.flipY || false,
      });
    }
  };

  const clearSelectedElement = () => {
    setSelectedElement(null);
    setSelectedElementUpdates(defaultTextElementState);
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
      link.download = `${selectedBackground?.name}.png`;
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
              <LayerPanel background={selectedBackground} layoutElements={selectedLayout?.elements ?? []} />
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
