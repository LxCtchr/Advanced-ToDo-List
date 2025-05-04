import { registerValidationRules, RegistrationFormData, useRegisterMutation } from "@/features/Register";
import { defineError } from "@/shared/helpers";
import { useNotification } from "@/shared/hooks/notificationHooks";
import { Button, Flex, Form, Input, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import { useNavigate } from "react-router";

const { Title } = Typography;

export const RegistrationPage = () => {
  const [form] = useForm<RegistrationFormData>();

  const navigate = useNavigate();

  const notification = useNotification();

  const [register] = useRegisterMutation();

  const handleAuthNotification = () => {
    notification.destroy();
    navigate("/login");
  };

  const actionButton = (
    <Button type="primary" size="small" variant="solid" color="primary" onClick={handleAuthNotification}>
      Войти
    </Button>
  );

  const handleSubmit = async (values: RegistrationFormData) => {
    try {
      delete values.confirmPassword;
      await register(values).unwrap();
      form.resetFields();
      notification.open({
        type: "success",
        actions: actionButton,
        message: "Успешно",
        description: "Перейти на страницу авторизации для входа в систему?",
      });
    } catch (error: unknown) {
      if (defineError(error) && error.originalStatus === 409) {
        notification.error({
          message: "Ошибка",
          description: `Такой пользователь уже существует. Измените данные`,
        });
      } else {
        notification.error({
          message: "Ошибка",
          description: `Произошла ошибка регистрации пользователя. Попробуйте позже`,
        });
      }
    }
  };

  return (
    <>
      <Title>Регистрация</Title>

      <Form form={form} onFinish={handleSubmit} autoComplete="off">
        <Form.Item name="username" rules={registerValidationRules.username} hasFeedback>
          <Input type="text" placeholder="Имя пользователя" />
        </Form.Item>
        <Form.Item name="login" rules={registerValidationRules.login} hasFeedback>
          <Input type="text" placeholder="Логин" />
        </Form.Item>
        <Form.Item name="password" rules={registerValidationRules.password} hasFeedback>
          <Input.Password type="password" placeholder="Пароль" />
        </Form.Item>
        <Form.Item name="confirmPassword" rules={registerValidationRules.confirmPassword} hasFeedback>
          <Input.Password type="password" placeholder="Подтвердите пароль" />
        </Form.Item>
        <Form.Item name="email" rules={registerValidationRules.email} hasFeedback>
          <Input type="email" placeholder="Почта" />
        </Form.Item>
        <Form.Item name="phone" rules={registerValidationRules.phoneNumber} hasFeedback>
          <Input type="tel" placeholder="Номер телефона" />
        </Form.Item>
        <Flex justify="space-between">
          <Button htmlType="submit">Зарегистрироваться</Button>
          <Button onClick={() => navigate("/login")}>Уже есть аккаунт</Button>
        </Flex>
      </Form>
    </>
  );
};
