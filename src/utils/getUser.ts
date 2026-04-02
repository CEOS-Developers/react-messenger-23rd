import usersJson from "@/data/users.json";
import type { User } from "@/types/message";

const userMap = new Map(usersJson.users.map(u => [u.userId, u as User]));

export const getUserById = (userId: number): User | undefined => userMap.get(userId);
