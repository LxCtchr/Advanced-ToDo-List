export const DEFAULT_PAGE_LIMIT = 20;

enum Roles {
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
  USER = "USER",
}

export const ROLES_TEXT: Record<Exclude<Roles, Roles.USER>, string> = {
  ADMIN: "администратора",
  MODERATOR: "модератора",
};
