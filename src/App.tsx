import { useEffect, useState } from 'react';
import {
  getPosts,
  getPostById,
  getCommentsForPost,
  updatePost,
  createPost, // new import for creating posts
  deletePost,
} from './api';

import type { Post, Comment } from './types';


function App() {

  // useState: to store the full list of posts fetched from the API
  const [allPosts, setAllPosts] = useState<Post[]>([]);

   // useState: to store details of a single post (when user clicks "View")
  const [singlePost, setSinglePost] = useState<Post | null>(null);

    // useState: to store comments related to the selected post
  const [comments, setComments] = useState<Comment[]>([]);

  // useState: to store any error messages to display in UI
  const [error, setError] = useState<string | null>(null);

  /*
useState: to store and update data.
  */

/*
  useEffect: Runs code after the component renders. 
  Used for:
  Fetching data
  Subscribing to events
  DOM updates
*/

/*
useEffect(() => {
  // code to run
  return () => {
    // optional cleanup
  };
}, [dependencies]);
*/
  // we use it to fetch the list of all posts as an initial effect.
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
  }, []); //The dependency array [] means the effect runs only once
  //if i include dependencies [postId] , the effect will run whenever postId changes.

  // Function to load(fetch) a single post and its comments
  const loadPostDetails = async (id: number) => {
    try {
      const post = await getPostById(id);
      const postComments = await getCommentsForPost(id);
      setSinglePost(post); // selected post
      setComments(postComments); // related comments
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

  //(new feature) Function to create a new post
  const handleCreatePost = async () => {
    try {
      const newPost = {
        userId: 1,
        title: 'New Post Title',
        body: 'This is a new post body.',
      };
      const created = await createPost(newPost);
      alert(`Post created with ID: ${created.id}`);
      // Optionally show it in the list immediately
      setAllPosts(prev => [created, ...prev]);
    } catch (err) {
      setError('Error creating new post');
    }
  };

  // Function to delete a post
  const handleDelete = async (id: number) => {
    try {
      await deletePost(id);
      alert(`Post ${id} deleted`);
      // After deletion, remove the post from UI
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

      {/* (new) Button to trigger create post */}
      <button onClick={handleCreatePost}>Create New Post</button>

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
