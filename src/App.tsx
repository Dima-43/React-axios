import { useEffect, useState } from 'react';
import {
  getPosts,
  getPostById,
  getCommentsForPost,
  updatePost,
  deletePost,
} from './api';

import type { Post, Comment } from './api';

function App() {
  //State with correct types
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [singlePost, setSinglePost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Load all posts once on initial render
  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const posts = await getPosts();
        setAllPosts(posts);
      } catch (err) {
        setError('Error fetching posts');
      }
    };
    fetchAllPosts();
  }, []);

  // Function to load a single post and its comments
  const loadPostDetails = async (id: number) => {
    try {
      const post = await getPostById(id);
      const postComments = await getCommentsForPost(id);
      setSinglePost(post);
      setComments(postComments);
    } catch (err) {
      setError(`Error fetching details for post ${id}`);
    }
  };

  // Function to update a post (for demo, updates title only)
  const handleUpdate = async (id: number) => {
    try {
      const updated = await updatePost(id, { title: 'Updated Title!' });
      alert(`Post ${id} updated with title: ${updated.title}`);
    } catch (err) {
      setError(`Error updating post ${id}`);
    }
  };

  // Function to delete a post
  const handleDelete = async (id: number) => {
    try {
      await deletePost(id);
      alert(`Post ${id} deleted`);
      setAllPosts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      setError(`Error deleting post ${id}`);
    }
  };

  return (
    <div style={{ padding: '1rem', fontFamily: 'Arial' }}>
      <h1>React Axios API Demo</h1>

      {/*  Show error if exists */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>All Posts</h2>
      <ul>
        {allPosts.slice(0, 5).map(post => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <br />
            <button onClick={() => loadPostDetails(post.id)}>View</button>
            <button onClick={() => handleUpdate(post.id)}>Update</button>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/*  Display single post + comments */}
      {singlePost && (
        <div>
          <h2>Post Details</h2>
          <p>
            <strong>{singlePost.title}</strong>
            <br />
            {singlePost.body}
          </p>

          <h3>Comments</h3>
          <ul>
            {comments.map(c => (
              <li key={c.id}>
                <strong>{c.email}:</strong> {c.body}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
