export interface User {
  email: string;
  name: string;
  username: string;
  avatarUrl?: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  text: string;
  senderId: number;
  conversationId: number;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface Conversation {
  user1Id: number;
  user2Id: number;
  messages: Message[];
  user1?: User;
  user2?: User;
  id: number;
  createdAt: string;
  updatedAt: string;
}
