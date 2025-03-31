import { Layout } from "antd";
import { Route, Routes } from "react-router";
import styles from "./App.module.css";
import { PagesSider } from "./components";
import { TodoListPage, UserProfilePage } from "./pages";

const { Content } = Layout;

function App() {
  return (
    <Layout className={styles.wrapper}>
      <PagesSider />
      <Content className={styles.content}>
        <Routes>
          <Route path="/" element={<TodoListPage />} />
          <Route path="profile" element={<UserProfilePage />} />
        </Routes>
      </Content>
    </Layout>
  );
}

export default App;
