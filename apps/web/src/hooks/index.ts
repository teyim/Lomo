import { useRouter } from "next/navigation";
import { CanvasOptions, RouteParams } from "@/types";
import { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import { scaleCanvas } from "@/lib/utils";
import { defaultScaleFactor } from "@/constants";
import { LayoutElement } from "@repo/db";

export const useDynamicNavigation = () => {
  const router = useRouter();

  const navigateToRoute = ({ slug, dynamicRouteName }: RouteParams) => {
    const url = `${dynamicRouteName}/${slug}`;
    router.push(url);
  };

  return { navigateToRoute };
};

export const useFabricCanvas = ({
  originalWidth,
  originalHeight,
  scaleFactor,
  backgroundColor,
}: CanvasOptions) => {
  const canvasRef = useRef<fabric.Canvas | null>(null);

  // Initialize canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas("canvas", {
      width: originalWidth,
      height: originalHeight,
      preserveObjectStacking: true,
      renderOnAddRemove: false,
      backgroundColor: "red",
    });

    canvasRef.current = canvas;

    // Cleanup canvas on unmount
    return () => {
      canvas.dispose();
    };
  }, [originalWidth, originalHeight]);

  // Function to add scaled objects to canvas
  const addScaledText = (
    text: string,
    fontSize: number,
    left: number,
    top: number,
    width: number,
    height: number,
    color: string,
    fontFamily: string,
    fontWeight: number,
  ) => {
    console.log(color);
    if (!canvasRef.current) return;

    const scaledText = new fabric.Textbox(text, {
      fontSize: fontSize,
      left: left,
      top: top,
      width: width,
      height: height,
      fill: color,
      fontFamily: fontFamily,
      fontWeight: fontWeight,
      textAlign: "left",
    });

    canvasRef.current.add(scaledText);
    canvasRef.current.renderAll();
  };

  // Function to set background image
  const setBackgroundImage = async (imageUrl: string) => {
    console.log("ran-background add");
    if (!canvasRef.current) return;

    const addBackgroundImage = async () => {
      const img = await fabric.FabricImage.fromURL(imageUrl, {
        crossOrigin: "anonymous", // Enable CORS
      });
      img.scale(scaleFactor.canvas);
      img.selectable = false;
      img.evented = false;
      img.top = 0;
      img.left = 0;

      canvasRef?.current?.add(img);
      canvasRef?.current?.sendObjectToBack(img);
      canvasRef?.current?.renderAll();
    };

    // Execute the asynchronous function immediately
    await addBackgroundImage();
  };

  const addImage = async (data: LayoutElement, updateImageUrl?: string) => {
    if (!canvasRef.current) return;

    const imageUrl = updateImageUrl || data.imageUrl;

    const addCanvasImage = async () => {
      const img = await fabric.FabricImage.fromURL(imageUrl ?? '', {
        crossOrigin: 'anonymous', // Enable CORS
      });

      img.scaleToHeight(data.height ?? 0);
      img.scaleToWidth(data.width ?? 0);
      img.left = data.positionX;
      img.top = data.positionY;

      canvasRef?.current?.add(img);
      canvasRef?.current?.renderAll();
    };

    await addCanvasImage();
  };

  // Function to export canvas at original scale
  const exportCanvas = (): string | null => {
    if (!canvasRef.current) return null;

    scaleCanvas(canvasRef.current, defaultScaleFactor);

    const dataURL = canvasRef.current.toDataURL({
      format: "jpeg",
      quality: 1,
      multiplier: 2,
    });

    scaleCanvas(canvasRef.current, scaleFactor);

    return dataURL;
  };

  return {
    canvasRef,
    addScaledText,
    exportCanvas,
    setBackgroundImage,
    addImage,
  };
};
