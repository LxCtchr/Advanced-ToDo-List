import { Roles } from "@/entities/User";
import { setIsAdmin, setIsModerator } from "@/features/Administer";
import { Action } from "@reduxjs/toolkit";

export const roleActionMap: Partial<Record<Roles, (flag: boolean) => Action>> = {
  [Roles.ADMIN]: setIsAdmin,
  [Roles.MODERATOR]: setIsModerator,
};
