// Type for a single post
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Type for a comment associated with a post
export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
