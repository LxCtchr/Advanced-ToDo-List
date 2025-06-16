import { Rule } from "antd/es/form";
import { LENGTH_VALIDATION_MESSAGE, MAX_CHARACTERS, MIN_CHARACTERS } from "./constants";

export const taskValidationRules: Rule[] = [
  { required: true, message: "Поле обязательно" },
  { min: MIN_CHARACTERS, message: LENGTH_VALIDATION_MESSAGE },
  { max: MAX_CHARACTERS, message: LENGTH_VALIDATION_MESSAGE },
];
