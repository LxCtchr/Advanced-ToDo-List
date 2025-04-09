import {
  MAX_CHARACTERS,
  MIN_LOGIN_CHARACTERS,
  MIN_PASSWORD_CHARACTERS,
  MIN_USERNAME_CHARACTERS,
  VALIDATION_MESSAGE,
} from "@/shared";
import { Rule } from "antd/es/form";
import { RegistrationFormData } from "./types";

export const registerValidationRules: Record<keyof RegistrationFormData, Rule[]> = {
  username: [
    { required: true, message: VALIDATION_MESSAGE },
    {
      min: MIN_USERNAME_CHARACTERS,
      message: `Имя пользователя должно быть от ${MIN_USERNAME_CHARACTERS} до ${MAX_CHARACTERS} символов в длину`,
    },
    {
      max: MAX_CHARACTERS,
      message: `Имя пользователя должно быть от ${MIN_USERNAME_CHARACTERS} до ${MAX_CHARACTERS} символов в длину`,
    },
    {
      validator: (_, value) => {
        const usernameRule = /^[a-zA-Zа-яА-ЯёЁ]+$/;
        if (!value || usernameRule.test(value)) {
          return Promise.resolve();
        } else {
          return Promise.reject("Имя пользователя должно содержать только латинские и русские символы");
        }
      },
    },
  ],
  login: [
    { required: true, message: VALIDATION_MESSAGE },
    {
      min: MIN_LOGIN_CHARACTERS,
      message: `Логин должен быть от ${MIN_LOGIN_CHARACTERS} до ${MAX_CHARACTERS} символов в длину`,
    },
    {
      max: MAX_CHARACTERS,
      message: `Логин должен быть от ${MIN_LOGIN_CHARACTERS} до ${MAX_CHARACTERS} символов в длину`,
    },
    {
      validator: (_, value) => {
        const loginRule = /^[a-zA-Z]+$/;
        if (!value || loginRule.test(value)) {
          return Promise.resolve();
        } else {
          return Promise.reject("Логин должен содержать только латинские символы");
        }
      },
    },
  ],
  password: [
    { required: true, message: VALIDATION_MESSAGE },
    {
      min: MIN_PASSWORD_CHARACTERS,
      message: `Пароль должен быть от ${MIN_PASSWORD_CHARACTERS} до ${MAX_CHARACTERS} символов в длину`,
    },
    {
      max: MAX_CHARACTERS,
      message: `Пароль должен быть от ${MIN_PASSWORD_CHARACTERS} до ${MAX_CHARACTERS} символов в длину`,
    },
  ],
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
  email: [
    { required: true, message: VALIDATION_MESSAGE },
    { type: "email", message: "Введите корректный email" },
  ],
  phoneNumber: [
    {
      validator: (_, value) => {
        const phoneRule = /^\+?[1-9]\d{10}$/;
        if (!value || phoneRule.test(value)) {
          return Promise.resolve();
        }
        return Promise.reject("Введите корректный номер телефона");
      },
    },
  ],
};
