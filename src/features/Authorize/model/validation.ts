import { MAX_CHARACTERS, MIN_LOGIN_CHARACTERS, MIN_PASSWORD_CHARACTERS, VALIDATION_MESSAGE } from "@/shared";
import { Rule } from "antd/es/form";
import { AuthData } from "./types";

export const authValidationRules: Record<keyof AuthData, Rule[]> = {
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
};
