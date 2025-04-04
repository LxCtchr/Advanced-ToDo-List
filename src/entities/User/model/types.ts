export type UserRoles = "ADMIN" | "MODERATOR" | "USER";

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  date: string;
  isBlocked: boolean;
  roles: UserRoles[];
  phoneNumber: string;
}
