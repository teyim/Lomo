import { useRouter } from "next/navigation";
import { CanvasOptions, RouteParams } from "@/types";
import { useEffect, useRef } from "react";
import * as fabric from "fabric";
import { getFontWeight } from "@/lib/utils";

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
  const scaledWidth = originalWidth * scaleFactor;
  const scaledHeight = originalHeight * scaleFactor;

  // Initialize canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas("canvas", {
      backgroundColor: backgroundColor,
      width: scaledWidth,
      height: scaledHeight,
      preserveObjectStacking: true,
      renderOnAddRemove: false,
    });

    canvasRef.current = canvas;

    // Cleanup canvas on unmount
    return () => {
      canvas.dispose();
    };
  }, [scaledWidth, scaledHeight]);

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
    fontWeight: string
  ) => {
    if (!canvasRef.current) return;

    const scaledText = new fabric.Textbox(text, {
      fontSize: fontSize * scaleFactor,
      left: left * scaleFactor,
      top: top * scaleFactor,
      width: width * scaleFactor,
      height: height * scaleFactor,
      fill: color,
      fontFamily: fontFamily,
      fontWeight: getFontWeight(fontWeight),
      textAlign: "center",
    });

    console.log(scaledText);
    canvasRef.current.add(scaledText);

    canvasRef.current.renderAll();
  };

  // Function to export canvas at original scale
  const exportCanvas = (): string | null => {
    if (!canvasRef.current) return null;

    // Scale up for export
    canvasRef.current.setDimensions({
      width: originalWidth,
      height: originalHeight,
    });

    canvasRef.current.getObjects().forEach((obj) => {
      obj.set({
        scaleX: obj.scaleX! / scaleFactor,
        scaleY: obj.scaleY! / scaleFactor,
        left: obj.left! / scaleFactor,
        top: obj.top! / scaleFactor,
        width: obj.width! / scaleFactor,
        height: obj.height! / scaleFactor,
      });
      obj.setCoords();
    });

    const dataURL = canvasRef.current.toDataURL();

    // Reset back to scaled dimensions
    canvasRef.current.setDimensions({
      width: scaledWidth,
      height: scaledHeight,
    });
    canvasRef.current.getObjects().forEach((obj) => {
      obj.set({
        scaleX: obj.scaleX! * scaleFactor,
        scaleY: obj.scaleY! * scaleFactor,
        left: obj.left! * scaleFactor,
        top: obj.top! * scaleFactor,
        width: obj.width! * scaleFactor,
        height: obj.height! * scaleFactor,
      });
      obj.setCoords();
    });

    canvasRef.current.renderAll();
    return dataURL;
  };

  return { canvasRef, addScaledText, exportCanvas };
};
