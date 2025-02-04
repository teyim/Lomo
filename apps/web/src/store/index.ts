import { ThumbnailBackgroundData } from '@/types';
import { create } from 'zustand'



interface BlogThumbnailState {
    selectedBackground: ThumbnailBackgroundData | null;
    addSelectedBackground: (background: ThumbnailBackgroundData) => void
}

export const useBlogThumbnailStore = create<BlogThumbnailState>()((set, get) => ({
    selectedBackground: null,
    addSelectedBackground: (background: ThumbnailBackgroundData) => set({ selectedBackground: background })
}))