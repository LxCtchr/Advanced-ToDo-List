import { Button, Flex } from "antd";
import { useNavigate } from "react-router";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Flex>
      <span>Страница не найдена</span>
      <Button onClick={() => navigate("/todo")}>Перейти на главную</Button>
    </Flex>
  );
};
