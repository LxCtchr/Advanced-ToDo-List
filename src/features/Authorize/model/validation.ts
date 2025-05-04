import { loginValidationRules, passwordValidationRules } from "@/shared/validation";
import { Rule } from "antd/es/form";
import { AuthData } from "./types";

export const authValidationRules: Record<keyof AuthData, Rule[]> = {
  login: loginValidationRules,
  password: passwordValidationRules,
};
