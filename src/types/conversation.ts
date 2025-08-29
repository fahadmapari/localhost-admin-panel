import { UserRef } from "./client";

export interface Conversation {
  _id: string;
  participants: UserRef[]; // Array of user IDs
  title: string;
  createdBy: string; // User ID of creator
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

export interface MessageType {
  _id: string;
  conversationId: string;
  sender: string;
  text: string;
  createdAt: string; // or Date if you want to parse it
  updatedAt: string; // or Date
  __v: number;
}
