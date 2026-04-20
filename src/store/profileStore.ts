import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProfileState {
  starredSrcs: string[];
  uploadedImages: string[];
  toggleStar: (src: string) => void;
  addUploadedImage: (src: string) => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    set => ({
      starredSrcs: [],
      uploadedImages: [],

      toggleStar: src =>
        set(state => ({
          starredSrcs: state.starredSrcs.includes(src)
            ? state.starredSrcs.filter(s => s !== src)
            : [...state.starredSrcs, src],
        })),

      addUploadedImage: src => set(state => ({ uploadedImages: [src, ...state.uploadedImages] })),
    }),
    { name: "profile-store" },
  ),
);
