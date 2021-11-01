import { useEffect, useState } from "react";
import { MessageService } from '../../services/MessagesService';
import { Last3Messages } from "./types";

export function useMessageList() {
  const [messages, setMessages] = useState<Last3Messages[]>([]);
  
  const loadLast3Messages = async () => {
    const response = await MessageService.getLast3Messages();
    setMessages(response.data);
  };

  useEffect(() => {
    try {
      loadLast3Messages();
    } catch (error) {
      console.log(error);
    }
  },[]);

  return {
    messages
  }
}