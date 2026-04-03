import { create } from "zustand";
import { persist } from "zustand/middleware";
import mockFriends from "@/data/mockFriends.json";

export type Friend = {
  id: number;
  name: string;
  profileImage: string;
  statusMessage?: string;
};

type FriendsStore = {
  friends: Friend[];
};

export const useFriendsStore = create<FriendsStore>()(
  persist(
    () => ({
      friends: mockFriends,
    }),
    { name: "friends-store", version: 1 },
  ),
);
