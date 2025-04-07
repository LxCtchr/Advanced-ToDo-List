export interface RegistrationData {
  login: string;
  username: string;
  password: string;
  email: string;
  phoneNumber?: string;
}

export type RegistrationFormData = RegistrationData & { confirmPassword?: string };
