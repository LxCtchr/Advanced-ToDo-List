import {
  emailValidationRules,
  loginValidationRules,
  passwordValidationRules,
  phoneNumberValidationRules,
  usernameValidationRules,
  VALIDATION_MESSAGE,
} from "@/shared";
import { Rule } from "antd/es/form";
import { RegistrationFormData } from "./types";

export const registerValidationRules: Record<keyof RegistrationFormData, Rule[]> = {
  username: usernameValidationRules,
  login: loginValidationRules,
  password: passwordValidationRules,
  confirmPassword: [
    { required: true, message: VALIDATION_MESSAGE },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue("password") === value) {
          return Promise.resolve();
        } else {
          return Promise.reject("Пароли должны совпадать");
        }
      },
    }),
  ],
  email: emailValidationRules,
  phoneNumber: phoneNumberValidationRules,
};
