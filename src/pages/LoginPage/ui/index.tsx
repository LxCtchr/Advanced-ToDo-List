import { sessionService } from "@/entities";
import { AuthData, authValidationRules, setIsAuth, useLoginMutation } from "@/features";
import { useNotification } from "@/shared/hooks/notificationHooks";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";
import { Button, Flex, Form, Input, Typography } from "antd";
import { useNavigate } from "react-router";

const { Title } = Typography;

export const LoginPage = () => {
  const [login] = useLoginMutation();

  const dispath = useAppDispatch();

  const navigate = useNavigate();

  const notification = useNotification();

  const handleSubmit = async (values: AuthData) => {
    try {
      const tokens = await login(values).unwrap();
      sessionService.accessToken = tokens.accessToken;
      localStorage.setItem("refreshToken", tokens.refreshToken);
      dispath(setIsAuth(true));
      navigate("/todo");
    } catch {
      notification.error({
        message: "Ошибка авторизации",
        description: `Неверный логин или пароль`,
      });
    }
  };

  return (
    <>
      <Title>Авторизация</Title>

      <Form onFinish={handleSubmit}>
        <Form.Item name="login" rules={authValidationRules.login} hasFeedback>
          <Input placeholder="Логин" />
        </Form.Item>
        <Form.Item name="password" rules={authValidationRules.password} hasFeedback>
          <Input.Password type="password" placeholder="Пароль" />
        </Form.Item>
        <Flex justify="space-between">
          <Button type="primary" color="primary" variant="solid" htmlType="submit">
            Войти
          </Button>
          <Button onClick={() => navigate("/register")}>Зарегистрироваться</Button>
        </Flex>
      </Form>
    </>
  );
};
