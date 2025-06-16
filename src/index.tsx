import App from "@/app/App";
import { NotificationProvider } from "@/app/providers";
import { store } from "@/app/store";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./app/styles/global.css";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </Provider>
);
