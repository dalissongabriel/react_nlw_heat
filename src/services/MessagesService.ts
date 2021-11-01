import { api } from "./api";
import { Last3Messages } from "../components/MessageList/types";

async function getLast3Messages() {
  return api.get<Last3Messages[]>('/messages/last3');
}

export const MessageService = {
  getLast3Messages,
};
