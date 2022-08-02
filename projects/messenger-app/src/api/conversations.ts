import http from './http';
import type { Conversation } from './types';

export async function getConversations() {
  const { data: json } = await http.get(`/conversations/`);
  const conversations: Conversation[] = json.data;
  return {
    data: conversations,
  };
}

interface createConversationParams {
  senderId: number;
  recipientId: number;
}

export async function createConversation(payload: createConversationParams) {
  const { data: json } = await http.post(`/conversations/`, payload);
  const conversation: Conversation = json.data;
  return {
    data: conversation,
  };
}
