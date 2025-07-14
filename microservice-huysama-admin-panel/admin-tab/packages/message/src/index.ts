import type { MessageInstance } from "antd/es/message/interface";
import type { NotificationInstance } from "antd/es/notification/interface";
import type { ModalStaticFunctions } from "antd/es/modal/confirm";
import {
  message as antdMessage,
  notification as antdNotification,
  Modal as antdModal,
  App,
} from "antd";

let message: MessageInstance = antdMessage;
let notification: NotificationInstance = antdNotification;

const { ...resetFns } = antdModal;
let modal: Omit<ModalStaticFunctions, "warn"> = resetFns;

/**
 * Thành phần này cung cấp phương thức tĩnh
 * Mục đích: Hiển thị message trên nhiều trang
 */
function StaticMessage() {
  const staticFunctions = App.useApp();

  message = staticFunctions.message;
  notification = staticFunctions.notification;
  modal = staticFunctions.modal;

  return null;
}

export {
  message,
  notification,
  modal,
};

export default StaticMessage;
