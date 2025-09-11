import { useContext } from "react";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { PostListContext } from "../store/post-list-store";

const Post = ({ post }) => {

  const {deletePost} = useContext(PostListContext)


  return (
    <div className="card cards">
      <div className="card-body">
        <h5 className="card-title">
          {post.title}

          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          
          onClick={()=>{deletePost(post.id)}}
          >
            <RiDeleteBin7Fill />
          </span>
        </h5>
        <p className="card-text">{post.body}</p>
        {post.tags.map((tag) => (
          <span key={tag} className="badge tags text-bg-primary">
            {tag}
          </span>
        ))}
      </div>
      <div className="alert alert-success reaction" role="alert">
        People likes : {post.reactions.likes} &nbsp; People dislikes : {post.reactions.dislikes}
      </div>
    </div>
  );
};

export default Post;
