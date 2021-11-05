import { useEffect, useState } from "react";
import { MessageService } from '../../services/MessagesService';
import { MessageAndUser } from "./types";
import {io} from 'socket.io-client';

const messagesQueue: MessageAndUser[] = [];
const socket = io("http://localhost:4000");
socket.on('new_message', (newMessage: MessageAndUser) => {
  messagesQueue.push(newMessage);
});

export function useMessageList() {
  const [messages, setMessages] = useState<MessageAndUser[]>([]);
  useEffect(() => {
    const timer = setInterval(() => {
      if(messagesQueue.length > 0) {
        setMessages( prevValue =>
          [
            messagesQueue[0],
            prevValue[0],
            prevValue[1],
          ].filter(Boolean)
        );
      }
    }, 3000);
    return () => clearInterval(timer);
  }, [])
  
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