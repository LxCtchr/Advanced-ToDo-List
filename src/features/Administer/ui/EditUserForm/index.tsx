import { useNotification } from "@/shared/hooks";
import { emailValidationRules, phoneNumberValidationRules, usernameValidationRules } from "@/shared/validation";
import { Button, Flex, Form, Input } from "antd";
import { isEqual } from "lodash";
import { useEditUserMutation } from "../../api";
import { getChangedValues } from "../../model/helpers";
import { UserRequest } from "../../model/types";

interface EditUserFormProps {
  userId?: string;
  cancelEditing: () => void;
  initialValues: UserRequest;
}

export const EditUserForm = ({ userId, initialValues, cancelEditing }: EditUserFormProps) => {
  const [editUser] = useEditUserMutation();

  const notification = useNotification();

  const handleSubmitEdit = async (formValues: UserRequest) => {
    if (isEqual(initialValues, formValues)) {
      cancelEditing();
      return;
    }

    try {
      const useEditData = getChangedValues({ initialValues, formValues });

      await editUser({ id: Number(userId), userData: useEditData }).unwrap();
      await cancelEditing();
      notification.success({ message: "Успешно", description: "Данные пользователя успешно обновлены" });
    } catch {
      notification.error({
        message: "Ошибка",
        description: "Не удалось обновить данные пользователя. Попробуйте позже.",
      });
    }
  };

  return (
    <Form<UserRequest> initialValues={initialValues} onFinish={handleSubmitEdit}>
      <Form.Item<UserRequest> name="username" rules={usernameValidationRules}>
        <Input />
      </Form.Item>
      <Form.Item<UserRequest> name="email" rules={emailValidationRules}>
        <Input />
      </Form.Item>
      <Form.Item<UserRequest> name="phoneNumber" rules={phoneNumberValidationRules}>
        <Input />
      </Form.Item>
      <Flex gap="0.4rem">
        <Form.Item>
          <Button htmlType="submit">Сохранить</Button>
        </Form.Item>
        <Form.Item>
          <Button onClick={cancelEditing}>Отмена</Button>
        </Form.Item>
      </Flex>
    </Form>
  );
};
