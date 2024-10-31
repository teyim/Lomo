"use client";
import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import { Template } from "@/types";
import { getFontWeight } from "@/lib/utils";

type TemplateEditorProps = {
  templateData: Template;
};

const TemplateEditor = ({ templateData }: TemplateEditorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new fabric.Canvas(canvasRef.current, {
        backgroundColor: `${templateData.backgroundColor}`,
        width: templateData.width,
        height: templateData.height,
        preserveObjectStacking: true,
        renderOnAddRemove: false,
      });

      const textArray = templateData.assets.map((asset) => {
        return new fabric.Textbox(`${asset.defaultText}`, {
          left: asset.positionX,
          top: asset.positionY,
          fontSize: asset.fontSize,
          width: asset.width,
          height: asset.height,
          fontWeight: getFontWeight(asset.fontWeight),
          fontFamily: asset.fontFamily,
          fill: asset.color,
          textAlign: "center",
        });
      });

      textArray.map(function (text) {
        initCanvas.add(text);
      });

      initCanvas.renderAll();

      return () => {
        initCanvas.dispose();
      };
    }
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <canvas id="canvas" ref={canvasRef} />
    </div>
  );
};

export default TemplateEditor;
