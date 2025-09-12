import { useContext  } from "react";
import Post from "./Post";
import { PostListContext } from "../store/post-list-store";
import WelcomeMessage from "./WelcomeMessage";
import LoadingSpiner from "./LoadingSpiner";

const PostList = () => {
  const { postList, featching } = useContext(PostListContext);



  return (
    <>
      {featching && <LoadingSpiner />}
      {!featching && postList.length === 0 && <WelcomeMessage></WelcomeMessage>}
      {!featching && postList.map((post) => <Post key={post.id} post={post} />)}
    </>
  );
};

export default PostList;
