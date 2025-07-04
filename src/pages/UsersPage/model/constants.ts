import { Roles } from "@/entities/User";

export const DEFAULT_PAGE_LIMIT = 20;

export const ROLES_TEXT: Record<Exclude<Roles, Roles.USER>, string> = {
  ADMIN: "администратора",
  MODERATOR: "модератора",
};
