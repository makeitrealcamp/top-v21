import http from './http';
import { Message } from './types';

interface createMessageParams {
  text: string;
  recipientId: number;
  conversationId: number;
}

export async function createMessage(payload: createMessageParams) {
  const { data: json } = await http.post(`/messages/`, payload);
  const message: Message = json.data;
  return {
    data: message,
  };
}
