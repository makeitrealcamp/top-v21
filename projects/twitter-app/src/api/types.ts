interface Photo {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

interface MongoDBDocument {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export type UserInput = {
  username: string;
  name: string;
  firstname: string;
  lastname: string;
  email: string;
  description?: string;
  location?: string;
} & MongoDBDocument;

export interface User {
  username: string;
  name: string;
  firstname: string;
  lastname: string;
  email: string;
  description?: string;
  location?: string;
}

export type CommentInput = {
  comment: string;
  userId: UserInput;
  tweetId: string;
} & MongoDBDocument;

export interface Comment {
  id: string;
  user: User;
  comment: string;
  date: string;
  createdAt: string;
}

export type TweetInput = {
  content: string;
  likes: number;
  photo: Photo;
  userId: UserInput;
  comments: CommentInput[];
  commentsCount: number;
} & MongoDBDocument;

export interface Tweet {
  id: string;
  user: User;
  content: string;
  date: string;
  createdAt: string;
  commentsCount: number;
  comments: Comment[];
  likes: number;
  photo: Photo;
}
