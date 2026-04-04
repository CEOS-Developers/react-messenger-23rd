import { create } from "zustand";
import { persist } from "zustand/middleware";
import mockFriends from "@/data/mockFriends.json";

export type FriendLink = {
  type: string;
  url: string;
};

export type Friend = {
  id: number;
  name: string;
  profileImage: string;
  statusMessage?: string;
  phone?: string;
  links?: FriendLink[];
};

type FriendsStore = {
  friends: Friend[];
  updateFriend: (id: number, fields: Partial<Omit<Friend, "id">>) => void;
};

export const useFriendsStore = create<FriendsStore>()(
  persist(
    (set) => ({
      friends: mockFriends,
      updateFriend: (id, fields) =>
        set((state) => ({
          friends: state.friends.map((f) =>
            f.id === id ? { ...f, ...fields } : f,
          ),
        })),
    }),
    { name: "friends-store", version: 2 },
  ),
);
