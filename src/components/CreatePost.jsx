import { useContext, useRef } from "react";
import { PostListContext } from "../store/post-list-store";

const CreatePost = () => {
  const { addPost } = useContext(PostListContext);
  const userIdRef = useRef("");
  const postTitleRef = useRef("");
  const postBodyRef = useRef("");
  const likesRef = useRef("");
  const dislikesRef = useRef("");
  const tagsRef = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const userId = userIdRef.current.value;
    const title = postTitleRef.current.value;
    const body = postBodyRef.current.value;
    const reactions = {
      likes: likesRef.current.value,
      dislikes: dislikesRef.current.value,
    };
    const tags = tagsRef.current.value.split(" ");

    fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body, reactions, userId, tags }),
    })
      .then((res) => res.json())
      .then((postData)=> addPost( {postData} ));

    userIdRef.current.value = "";
    postTitleRef.current.value = "";
    postBodyRef.current.value = "";
    likesRef.current.value = "";
    dislikesRef.current.value = "";
    tagsRef.current.value = "";
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
      <p> Number of reactions ?</p>
      <label htmlFor="likes" className="form-label">
        people Likes :
      </label>
      <input
        type="text"
        ref={likesRef}
        className="form-control"
        id="likes"
        placeholder="How many people Likes to this post"
      />
      <label htmlFor="dislikes" className="form-label">
        people Dislikes :
      </label>
      <input
        type="text"
        ref={dislikesRef}
        className="form-control"
        id="dislikes"
        placeholder="How many people Dislikes the  post"
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
