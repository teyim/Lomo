import { useRouter } from "next/navigation";
import { CanvasOptions, RouteParams } from "@/types";
import { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import { getFontWeight } from "@/lib/utils";
import backgroundImage from "public/images/Frame6.jpg";
import { Scale } from "lucide-react";

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
    fontWeight: string,
  ) => {
    if (!canvasRef.current) return;

    const scaledText = new fabric.Textbox(text, {
      fontSize: fontSize,
      left: left,
      top: top,
      width: width,
      height: height,
      fill: color,
      fontFamily: fontFamily,
      fontWeight: getFontWeight(fontWeight),
      textAlign: "center",
    });

    canvasRef.current.add(scaledText);
    canvasRef.current.renderAll();
  };

  // Function to set background image
  const setBackgroundImage = (imageUrl: string) => {
    console.log("ran-background add");
    if (!canvasRef.current) return;

    let tempBackgroundImage: fabric.FabricImage<
      Partial<fabric.ImageProps>,
      fabric.SerializedImageProps,
      fabric.ObjectEvents
    >;

    fabric.FabricImage.fromURL(imageUrl).then((img) => {
      (tempBackgroundImage = img),
        tempBackgroundImage.scale(0.5),
        (tempBackgroundImage.selectable = false),
        (tempBackgroundImage.evented = false),
        (tempBackgroundImage.top = 0),
        (tempBackgroundImage.left = 0);

      canvasRef?.current?.add(tempBackgroundImage);
      canvasRef?.current?.sendObjectToBack(tempBackgroundImage);
      canvasRef?.current?.renderAll();
    });
  };

  // Function to export canvas at original scale
  const exportCanvas = (): string | null => {
    if (!canvasRef.current) return null;

    const dataURL = canvasRef.current.toDataURL({
      format: "jpeg",
      quality: 1,
      multiplier: 1,
    });

    return dataURL;
  };

  return { canvasRef, addScaledText, exportCanvas, setBackgroundImage };
};
