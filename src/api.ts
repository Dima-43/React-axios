// src/api.ts
import axios from 'axios';

// Load base URL from environment
const BASE_URL = import.meta.env.VITE_API_URL as string;

// -----------------
// Interfaces
// -----------------
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

// -----------------
// API Functions
// -----------------

export const getPosts = async (): Promise<Post[]> => {
  const response = await axios.get<Post[]>(`${BASE_URL}/posts`);
  return response.data;
};

export const getPostById = async (id: number): Promise<Post> => {
  const response = await axios.get<Post>(`${BASE_URL}/posts/${id}`);
  return response.data;
};

export const getCommentsForPost = async (postId: number): Promise<Comment[]> => {
  const response = await axios.get<Comment[]>(`${BASE_URL}/posts/${postId}/comments`);
  return response.data;
};

export const updatePost = async (
  id: number,
  updatedData: Partial<Post>
): Promise<Post> => {
  const response = await axios.put<Post>(`${BASE_URL}/posts/${id}`, updatedData);
  return response.data;
};

export const deletePost = async (id: number): Promise<boolean> => {
  const response = await axios.delete(`${BASE_URL}/posts/${id}`);
  return response.status === 200;
};
