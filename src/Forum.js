import { useState, useEffect } from 'react';
import "./App.css";
import { db } from './firebase-config';
import { 
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc
 } from 'firebase/firestore'

function Forum() {
  const [newTitle, setNewTitle] = useState("");
  const [newMsg, setNewMsg] = useState("");

  const [posts, setPosts] = useState([]);
  const postsCollectionRef = collection( db, "posts")

  const createPosts = async () => {
    await addDoc(postsCollectionRef, {title: newTitle, message: newMsg, likes: 0})
  }

  const likePost = async ( id, likes) => {
    const postDoc = doc(db, "posts", id);
    const newFields = { likes: likes + 1 };
    await updateDoc(postDoc, newFields);
  }

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  };

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getPosts();
  }, [])

  return (
  <div className="Forum">

    <input 
    placeholder='Title...' 
    onChange={(event) => {
      setNewTitle(event.target.value);
    }} 
    />
    <input  
    placeholder='Message...'
    onChange={(event) => {
      setNewMsg(event.target.value);
    }}
    />
    <button onClick={createPosts}>Create Post</button>

    {posts.map((post) => {
      return (
        <div>
            {" "}
            <h2>{post.title}</h2>
            <h4>{post.message}</h4>
            <h6>{post.likes}</h6>
            <button
                onClick={() => {
                    likePost(post.id, post.likes);
                }}
            >
            {" "}
            Like post
            </button>
            <button
              onClick={() => {
                deletePost(post.id);
              }}
            >
              {" "}
              Delete Post
            </button>
        </div>
      );
    })}
  </div>
  )
}

export default Forum;