import { LayoutCardProps, LayoutWithElements, ThumbnailBackgroundData } from "@/types";
import { create } from "zustand";

interface BlogThumbnailState {
  selectedBackground: ThumbnailBackgroundData | null;
  selectedLayout:LayoutCardProps|null;
  addSelectedLayout: (layout: LayoutCardProps) => void;
  addSelectedBackground: (background: ThumbnailBackgroundData) => void;
}

export const useBlogThumbnailStore = create<BlogThumbnailState>()(
  (set, get) => ({
    selectedBackground: null,
    selectedLayout:null,
    addSelectedLayout: (layout: LayoutCardProps) =>
      set({ selectedLayout: layout}),
  addSelectedBackground: (background: ThumbnailBackgroundData) =>
      set({ selectedBackground: background }),
  }))
