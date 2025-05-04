import { Rule } from "antd/es/form";
import {
  MAX_CHARACTERS,
  MIN_LOGIN_CHARACTERS,
  MIN_PASSWORD_CHARACTERS,
  MIN_USERNAME_CHARACTERS,
  VALIDATION_MESSAGE,
} from "../constants";

export const usernameValidationRegex = /^[a-zA-Zа-яА-ЯёЁ]+$/;

export const usernameValidationRules: Rule[] = [
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
      if (!value || usernameValidationRegex.test(value)) {
        return Promise.resolve();
      } else {
        return Promise.reject("Имя пользователя должно содержать только латинские и русские символы");
      }
    },
  },
];

export const loginValidationRegex = /^[a-zA-Z]+$/;

export const loginValidationRules: Rule[] = [
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
      if (!value || loginValidationRegex.test(value)) {
        return Promise.resolve();
      } else {
        return Promise.reject("Логин должен содержать только латинские символы");
      }
    },
  },
];

export const emailValidationRules: Rule[] = [
  { required: true, message: VALIDATION_MESSAGE },
  { type: "email", message: "Введите корректный email" },
];

export const passwordValidationRules: Rule[] = [
  { required: true, message: VALIDATION_MESSAGE },
  {
    min: MIN_PASSWORD_CHARACTERS,
    message: `Пароль должен быть от ${MIN_PASSWORD_CHARACTERS} до ${MAX_CHARACTERS} символов в длину`,
  },
  {
    max: MAX_CHARACTERS,
    message: `Пароль должен быть от ${MIN_PASSWORD_CHARACTERS} до ${MAX_CHARACTERS} символов в длину`,
  },
];

export const phoneNumberValidationRegex = /^\+\d{11}$/;

export const phoneNumberValidationRules: Rule[] = [
  {
    validator: (_, value) => {
      if (!value || phoneNumberValidationRegex.test(value)) {
        return Promise.resolve();
      }
      return Promise.reject("Введите корректный номер телефона");
    },
  },
];
