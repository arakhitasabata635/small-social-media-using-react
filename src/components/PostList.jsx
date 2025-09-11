import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostListContext } from "../store/post-list-store";
import WelcomeMessage from "./WelcomeMessage";
import LoadingSpiner from "./LoadingSpiner";

const PostList = () => {
  const { postList, addInitialPostList } = useContext(PostListContext);

  const [featching, setFatching]= useState(false)

  useEffect(() => {
    setFatching(true)
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) => {
        addInitialPostList(data.posts);
        setFatching(false)
      });
  }, []);

  return (
    <>
    {featching && <LoadingSpiner/>}
      {!featching && postList.length === 0 && <WelcomeMessage></WelcomeMessage>}
      {!featching && postList.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
};

export default PostList;
