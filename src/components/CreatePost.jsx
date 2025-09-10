import { useContext, useRef } from "react";
import { PostListContext } from "../store/post-list-store";

const CreatePost = () => {
  const { addPost } = useContext(PostListContext);
  const userIdRef = useRef("");
  const postTitleRef = useRef("");
  const postBodyRef = useRef("");
  const reactionsRef = useRef("");
  const tagsRef = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = new Date();
    const userId = userIdRef.current.value;
    const title = postTitleRef.current.value;
    const body = postBodyRef.current.value;
    const reactions = reactionsRef.current.value;
    const tags = tagsRef.current.value.split(" ");
    const postData = { id, title, body, reactions, userId, tags };
    userIdRef.current.value = "";
    postTitleRef.current.value = "";
    postBodyRef.current.value = "";
    reactionsRef.current.value = "";
    tagsRef.current.value = "";
    addPost({ postData });
  };

  return (
    <form className="create-post" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="userId" className="form-label">
          Enter your User Id here
        </label>
        <input
          type="text"
          ref={userIdRef}
          className="form-control"
          id="UserId"
          placeholder="Your User Id"
        />
        <label htmlFor="title" className="form-label">
          Post Title
        </label>
        <input
          type="text"
          ref={postTitleRef}
          className="form-control"
          id="title"
          placeholder="How are you felling today...."
        />
      </div>
      <label htmlFor="title" className="form-label">
        Post Content
      </label>
      <textarea
        rows={4}
        type="text"
        ref={postBodyRef}
        className="form-control"
        id="body"
        placeholder="Tell us more about it"
      />
      <label htmlFor="reactions" className="form-label">
        Number of reactions
      </label>
      <input
        type="text"
        ref={reactionsRef}
        className="form-control"
        id="reactions"
        placeholder="How many people reacted to this post"
      />
      <label htmlFor="tags" className="form-label">
        Enter your hashtags here
      </label>
      <input
        type="text"
        ref={tagsRef}
        className="form-control"
        id="tags"
        placeholder="please enter tags using space"
      />
      <button type="submit" className="btn btn-primary">
        Post
      </button>
    </form>
  );
};

export default CreatePost;
