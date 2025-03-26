export const taskValidation = (taskTitle: string) => {
  if (!taskTitle) {
    alert("Поле обязательно для заполнения");
    return false;
  }

  if (taskTitle.length < 2 || taskTitle.length > 64) {
    alert("Название задачи может быть от 2 до 64 символов в длину");
    return false;
  }

  return true;
};
