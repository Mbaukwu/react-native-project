import Toast, { ToastConfig } from "react-native-toast-message";
import { ToastMessageItem } from "./ToastMessageItem";

type Props = {
  [key: string]: any;
};

const toastConfig: ToastConfig = {
  success: ({
    text1,
    text2,
  }: {
    text1?: string;
    text2?: string;
    props: Props;
  }) => (
    <ToastMessageItem
      type="success"
      text1={text1 || ""}
      text2={text2 || ""}
    />
  ),
  error: ({
    text1,
    text2,
  }: {
    text1?: string;
    text2?: string;
    props: Props;
  }) => (
    <ToastMessageItem 
      type="error" 
      text1={text1 || ""} 
      text2={text2 || ""} 
    />
  )
};

export const ToastMessage = () => {
  return <Toast config={toastConfig} position="top" />;
};