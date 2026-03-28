import usersJson from "@/data/users.json";
import type { User } from "@/types/message";

const users = usersJson.users as User[];

export const getUserById = (userId: number): User | undefined =>
  users.find(u => u.userId === userId);
