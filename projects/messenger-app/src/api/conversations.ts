import http from './http';
import type { Conversation } from './types';

export async function getConversations() {
  const { data: json } = await http.get(`/conversations/`);
  const conversations: Conversation[] = json.data;
  return {
    data: conversations,
  };
}
