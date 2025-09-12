import { createContext, useEffect, useReducer, useState } from "react";

export const PostListContext = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
  featching : false,
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = newPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "ADD_POST_FROM_SERVER") {
    newPostList = action.payload.posts;
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload.postData, ...currPostList];
    console.log(newPostList);
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, []);

    const [featching, setFatching] = useState(false);

  useEffect(() => {
    setFatching(true);
    const controler = new AbortController();
    const signal = controler.signal;
    fetch("https://dummyjson.com/posts" , {signal})
      .then((res) => res.json())
      .then((data) => {
        addInitialPostList(data.posts);
        setFatching(false);
      });

    return () => {
      controler.abort();
    };
  }, []);

  const addInitialPostList = (posts) => {
    dispatchPostList({
      type: "ADD_POST_FROM_SERVER",
      payload: {
        posts,
      },
    });
  };

  const addPost = (postData) => {
    const addPostAction = {
      type: "ADD_POST",
      payload: postData,
    };
    dispatchPostList(addPostAction);
  };

  const deletePost = (postId) => {
    const deletePostAction = {
      type: "DELETE_POST",
      payload: {
        postId,
      },
    };
    dispatchPostList(deletePostAction);
  };

  return (
    <PostListContext.Provider
      value={{ postList, addPost, deletePost,featching }}
    >
      {children}
    </PostListContext.Provider>
  );
};

export default PostListProvider;
