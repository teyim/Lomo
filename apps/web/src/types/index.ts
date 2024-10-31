export enum DynamicRoutes {
  Template = "/template",
}

export type RouteParams = {
  slug: string;
  dynamicRouteName: DynamicRoutes;
};

type TemplateContentType = "TEXT" | "IMAGE";
type TemplateTextFontWeight =
  | "Bold"
  | "Regular"
  | "Light"
  | "SemiBold"
  | "ExtraBold";

export interface TemplateAsset {
  id: string;
  templateId: string;
  type: TemplateContentType; // Add other types if needed
  label: string;
  url?: string | null;
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  defaultText: string;
  fontSize: number;
  color: string;
  fontFamily: string;
  fontWeight: TemplateTextFontWeight; // Add other weights if applicable
}

export interface Template {
  id: string;
  name: string;
  img: string;
  width: number;
  height: number;
  backgroundColor: string;
  categoryId: string;
  assets: TemplateAsset[];
}

export type CanvasOptions = {
  originalWidth: number;
  originalHeight: number;
  scaleFactor: number;
  backgroundColor: string;
};
