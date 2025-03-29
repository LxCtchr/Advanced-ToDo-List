import { MAX_CHARACTERS, MIN_CHARACTERS } from "../constants";

export const taskValidation = (taskTitle: string) => {
  if (!taskTitle) {
    alert("Поле обязательно для заполнения");
    return false;
  }

  if (taskTitle.length < MIN_CHARACTERS || taskTitle.length > MAX_CHARACTERS) {
    alert("Название задачи может быть от 2 до 64 символов в длину");
    return false;
  }

  return true;
};
