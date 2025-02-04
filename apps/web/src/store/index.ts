import { ThumbnailBackgroundData } from "@/types";
import { create } from "zustand";

interface BlogThumbnailState {
  selectedBackground: ThumbnailBackgroundData | null;
  addSelectedBackground: (background: ThumbnailBackgroundData) => void;
}

interface CanvasAssetsState {
  assets: any[],
  setAssets: (assets: any) => void
}

export const useCanvasAssetsStore = create<CanvasAssetsState>()((set, get) => ({
  assets: [],
  setAssets: (assets: any) => set({ assets: assets })
}))


export const useBlogThumbnailStore = create<BlogThumbnailState>()(
  (set, get) => ({
    selectedBackground: null,
    addSelectedBackground: (background: ThumbnailBackgroundData) =>
      set({ selectedBackground: background }),
  }),
);
