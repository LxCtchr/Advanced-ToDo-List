import { NotificationInstance } from "antd/es/notification/interface";
import { createContext } from "react";

type NotificationContextType = {
  api: NotificationInstance;
};

export const NotificationContext = createContext<NotificationContextType | null>(null);
