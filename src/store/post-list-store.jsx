import { createContext, useReducer } from "react";

export const PostListContext = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = newPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload.postData, ...currPostList];
    console.log(newPostList);
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    DEFAULT_POST_LIST
  );

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
    <PostListContext.Provider value={{ postList, addPost, deletePost }}>
      {children}
    </PostListContext.Provider>
  );
};

const DEFAULT_POST_LIST = [
  {
    id: "1",
    title: "Lorem ipsum dolor sit amet.",
    body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem, odio.",
    reactions: 15,
    userId: "user-9",
    tags: ["Graduation", "Unbeliveble"],
  },
  {
    id: "2",
    title: "Lorem ipsum dolor sit amet.",
    body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem, odio.",
    reactions: 15,
    userId: "user-5",
    tags: ["Graduation", "Unbeliveble"],
  },
];

export default PostListProvider;
