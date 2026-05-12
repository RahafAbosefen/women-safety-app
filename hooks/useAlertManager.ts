import { useState, useCallback } from "react";

export type AlertType = "success" | "error" | "confirm" | "info";

type AlertState = {
  visible: boolean;
  type: AlertType;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};
export const useAlertManager = () => {
  const [alert, setAlert] = useState<AlertState>({
    visible: false,
    type: "info",
    title: "",
    message: "",
  });

  const openAlert = useCallback((data: Omit<AlertState, "visible">) => {
    setAlert({ ...data, visible: true });
  }, []);

  const closeAlert = useCallback(() => {
    setAlert((prev) => ({ ...prev, visible: false }));
  }, []);

  return {
    alert,
    openAlert,
    closeAlert,
  };
};
