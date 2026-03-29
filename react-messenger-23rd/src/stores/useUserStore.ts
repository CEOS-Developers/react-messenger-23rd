import { create } from "zustand";
import type { User } from "@/types";
import usersData from "@/data/users.json";

interface UserState {
  users: User[];
  currentUserId: number;
  switchUser: (userId: number) => void;
  getUserById: (userId: number) => User | undefined;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: usersData,
  currentUserId: 0,

  switchUser: (userId) => set({ currentUserId: userId }),

  getUserById: (userId) => get().users.find((u) => u.id === userId),
}));
