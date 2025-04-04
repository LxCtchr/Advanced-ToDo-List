export interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface AuthData {
  login: string;
  password: string;
}

export interface RegistrationData {
  login: string;
  username: string;
  password: string;
  email: string;
  phoneNumber?: string;
}

export type RegistrationFormData = RegistrationData & { confirmPassword?: string };
