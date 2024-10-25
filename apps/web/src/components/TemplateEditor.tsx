"use client";
import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import { Template } from "@/types";

type TemplateEditorProps = {
  templateData: Template;
};

const TemplateEditor = ({ templateData }: TemplateEditorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new fabric.Canvas(canvasRef.current, {
        backgroundColor: `${templateData.backgroundColor}`,
        width: 800,
        height: 500,
        preserveObjectStacking: true,
        renderOnAddRemove: false,
      });

      const text = new fabric.Textbox(`${templateData.assets[0].defaultText}`, {
        left: 400,
        top: 60,
        fontSize: 40,
        fontWeight: 300,
        fontFamily: "Lexend",
        fill: "white",
      });

      initCanvas.add(text);
      initCanvas.renderAll();

      return () => {
        initCanvas.dispose();
      };
    }
  }, []);

  return (
    <div className=" w-full h-full flex justify-center items-center">
      <canvas id="canvas" ref={canvasRef} />
    </div>
  );
};

export default TemplateEditor;
