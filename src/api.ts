// src/api.ts

import axios from 'axios';
import type { Post, Comment } from './types';

// Load base URL from environment
const BASE_URL = import.meta.env.VITE_API_URL as string;

// -----------------
// API Functions
// -----------------

// Fetch all posts
//Fetch a list of items (GET)
export const getPosts = async (): Promise<Post[]> => {
  const response = await axios.get<Post[]>(`${BASE_URL}/posts`);
  return response.data;
};

// Fetch a single post by ID
//Fetch item details by ID (GET)
export const getPostById = async (id: number): Promise<Post> => {
  const response = await axios.get<Post>(`${BASE_URL}/posts/${id}`);
  return response.data;
};

// Fetch comments for a specific post
export const getCommentsForPost = async (postId: number): Promise<Comment[]> => {
  const response = await axios.get<Comment[]>(`${BASE_URL}/posts/${postId}/comments`);
  return response.data;
};


//Submit data (POST)
// Create a new post
export const createPost = async (newPost: Omit<Post, 'id'>): Promise<Post> => { //Omit<Post, 'id'> means we’re sending all Post fields except id (since the server usually generates it).
  const response = await axios.post<Post>(`${BASE_URL}/posts`, newPost);
  return response.data;
};


// Update a post by ID
//Update data (PUT or PATCH)
export const updatePost = async (
  id: number,
  updatedData: Partial<Post>
): Promise<Post> => {
  const response = await axios.put<Post>(`${BASE_URL}/posts/${id}`, updatedData);
  return response.data;
};

// Delete a post by ID
//Delete data (DELETE)
export const deletePost = async (id: number): Promise<boolean> => {
  const response = await axios.delete(`${BASE_URL}/posts/${id}`);
  return response.status === 200;
};
