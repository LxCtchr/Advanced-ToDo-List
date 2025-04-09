import { NotificationContext } from "@/shared/contexts/notificationContext";
import { notification } from "antd";

export const NotificationProvider = ({ children }: React.PropsWithChildren) => {
  const [api, contextHolder] = notification.useNotification({ duration: 5, placement: "topRight" });

  return (
    <NotificationContext.Provider value={{ api }}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};
