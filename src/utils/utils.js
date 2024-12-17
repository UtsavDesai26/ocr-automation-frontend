import { message } from "antd";

export const handleError = (error) => {
  const err = error?.response?.data;
  message.error(err?.message?.[0] || "Something went wrong");
};
