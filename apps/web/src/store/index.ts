/* eslint-disable no-unused-vars */
import { defaultScaleFactor } from '@/constants';
import { LayoutCardProps, LayoutWithElements, ThumbnailBackgroundData } from '@/types';
import { create } from 'zustand';

interface BlogThumbnailState {
  scaleFactor: { canvas: number; text: number };
  setScaleFactor: (value: { canvas: number; text: number }) => void;
  selectedBackground: ThumbnailBackgroundData | null;
  selectedImageAsset: string | null;
  selectedLayout: LayoutCardProps | null;
  addSelectedLayout: (layout: LayoutCardProps) => void;
  addSelectedBackground: (background: ThumbnailBackgroundData) => void;
  addSelectedImageAsset: (image: string) => void;
}

export const useBlogThumbnailStore = create<BlogThumbnailState>()((set, get) => ({
  scaleFactor: { ...defaultScaleFactor },
  setScaleFactor: (value: { canvas: number; text: number }) => set({ scaleFactor: value }),
  selectedBackground: null,
  selectedImageAsset: null,
  selectedLayout: null,
  addSelectedLayout: (layout: LayoutCardProps) => set({ selectedLayout: layout }),
  addSelectedBackground: (background: ThumbnailBackgroundData) =>
    set({ selectedBackground: background }),
  addSelectedImageAsset: (image: string) => set({ selectedImageAsset: image }),
}));
