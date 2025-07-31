import { useEffect, useState } from 'react';
import {
  getPosts,
  getPostById,
  getCommentsForPost,
  updatePost,
  deletePost,
} from './api';

function App() {
  // State to store various data
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [singlePost, setSinglePost] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [updatedPost, setUpdatedPost] = useState<any>(null);
  const [deleteStatus, setDeleteStatus] = useState<boolean | null>(null);

  // Load all API calls once on page load
  useEffect(() => {
    const fetchData = async () => {
      // 1. Get all posts
      const posts = await getPosts();
      setAllPosts(posts);

      // 2. Get single post by ID = 1
      const post = await getPostById(1);
      setSinglePost(post);

      // 3. Get comments for post ID = 1
      const commentsData = await getCommentsForPost(1);
      setComments(commentsData);

      // 4. Update post ID = 1 (demo update)
      const updated = await updatePost(1, {
        title: 'Updated Title',
        body: 'Updated body content',
        userId: 1,
      });
      setUpdatedPost(updated);

      // 5. Delete post ID = 1 (demo delete)
      const deleted = await deletePost(1);
      setDeleteStatus(deleted);
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>React Axios API Demo</h1>

      {/* 1. All Posts */}
      <section>
        <h2>All Posts (first 5)</h2>
        <ul>
          {allPosts.slice(0, 5).map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </section>

      {/* 2. Single Post */}
      <section>
        <h2>Single Post (ID = 1)</h2>
        {singlePost ? (
          <div>
            <strong>{singlePost.title}</strong>
            <p>{singlePost.body}</p>
          </div>
        ) : (
          <p>Loading single post...</p>
        )}
      </section>

      {/* 3. Comments for Post */}
      <section>
        <h2>Comments for Post ID = 1</h2>
        <ul>
          {comments.slice(0, 3).map((comment) => (
            <li key={comment.id}>
              <strong>{comment.name}</strong>: {comment.body}
            </li>
          ))}
        </ul>
      </section>

      {/* 4. Updated Post */}
      <section>
        <h2>Updated Post (ID = 1)</h2>
        {updatedPost ? (
          <div>
            <strong>{updatedPost.title}</strong>
            <p>{updatedPost.body}</p>
          </div>
        ) : (
          <p>Updating post...</p>
        )}
      </section>

      {/* 5. Delete Status */}
      <section>
        <h2>Delete Post (ID = 1)</h2>
        <p>
          {deleteStatus === null
            ? 'Deleting post...'
            : deleteStatus
            ? 'Post deleted successfully.'
            : 'Failed to delete post.'}
        </p>
      </section>
    </div>
  );
}

export default App;

