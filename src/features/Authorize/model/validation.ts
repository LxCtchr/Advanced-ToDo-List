import { loginValidationRules, passwordValidationRules } from "@/shared";
import { Rule } from "antd/es/form";
import { AuthData } from "./types";

export const authValidationRules: Record<keyof AuthData, Rule[]> = {
  login: loginValidationRules,
  password: passwordValidationRules,
};
