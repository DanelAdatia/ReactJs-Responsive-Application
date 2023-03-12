import React, { useContext, useEffect } from "react";
import FeedPost from "./components/FeedPost";
import { GetAllPosts } from "../../api/FeedPost";
import { MyContext } from "../../contexts/UserContext";

const Feed = () => {
  const { posts, setPosts } = useContext(MyContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await GetAllPosts();
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [setPosts]);

  return (
    <>
      {posts.map((post) => (
        <FeedPost key={post.id} post={post} />
      ))}
    </>
  );
};

export default Feed;
