/* eslint-disable no-unused-vars */
import { defaultImageElementState, defaultTextElementState, supportedFonts } from '@/constants';
import { Layout, LayoutElement } from '@repo/db';

export enum DynamicRoutes {
  Template = '/template',
}

export type SupportedFonts = (typeof supportedFonts)[number];

export type module = 'background' | 'layout';

export type RouteParams = {
  slug: string;
  dynamicRouteName: DynamicRoutes;
};

export type LayoutElementType = 'HEADING' | 'SUBHEADING' | 'IMAGE';

type TemplateTextFontWeight = 'Bold' | 'Regular' | 'Light' | 'SemiBold' | 'ExtraBold';

export interface TemplateAsset {
  id: string;
  templateId: string;
  type: LayoutElementType; // Add other types if needed
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
  scaleFactor: { canvas: number; text: number };
  backgroundColor: string;
};

export type ThumbnailBackgroundData = {
  name: string;
  imageUrl: string;
  recommendedColors: {
    primary: string;
    secondary: string;
  };
};

export type LayoutCardProps = {
  name: string;
  imageUrl: string;
  elements: LayoutElement[];
};

export interface LayoutWithElements extends Layout {
  elements: LayoutElement[];
}

export type SelectedElement = typeof defaultTextElementState | typeof defaultImageElementState;
