import { Roles } from "@/entities";
import { setIsAdmin, setIsModerator } from "@/features";
import { Action } from "@reduxjs/toolkit";

export const roleActionMap: Partial<Record<Roles, (flag: boolean) => Action>> = {
  [Roles.ADMIN]: setIsAdmin,
  [Roles.MODERATOR]: setIsModerator,
};
