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
