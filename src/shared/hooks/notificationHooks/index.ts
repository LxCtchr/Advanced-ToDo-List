import { useContext } from "react";
import { NotificationContext } from "../../contexts/notificationContext";

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("Хук useNotification должен быть использован внутри NotificationProvider");
  }

  return context.api;
};
