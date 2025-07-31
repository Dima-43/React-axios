// src/api.ts
import axios from 'axios';

// Load base URL from environment
const BASE_URL = import.meta.env.VITE_API_URL;

// 1. Fetch all posts
export const getPosts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/posts`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching posts:', error.message);
    return [];
  }
};

// 2. Fetch a single post by ID
export const getPostById = async (id: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/posts/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(`Error fetching post with ID ${id}:`, error.message);
    return null;
  }
};

// 3. Fetch comments for a specific post
export const getCommentsForPost = async (postId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/posts/${postId}/comments`);
    return response.data;
  } catch (error: any) {
    console.error(`Error fetching comments for post ${postId}:`, error.message);
    return [];
  }
};

// 4. Update a post
export const updatePost = async (id: number, updatedData: any) => {
  try {
    const response = await axios.put(`${BASE_URL}/posts/${id}`, updatedData);
    return response.data;
  } catch (error: any) {
    console.error(`Error updating post with ID ${id}:`, error.message);
    return null;
  }
};

// 5. Delete a post
export const deletePost = async (id: number) => {
  try {
    const response = await axios.delete(`${BASE_URL}/posts/${id}`);
    return response.status === 200;
  } catch (error: any) {
    console.error(`Error deleting post with ID ${id}:`, error.message);
    return false;
  }
};
