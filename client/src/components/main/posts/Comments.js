import Comment from "./Comment";

const Comments = ({ comments, loadComments }) => {
  // comments are only rendered after they are loaded so do not need to use useEffect here to update state or hold any state (compared to posts)
  return (
    <div className="mb-5">
      {comments.length !== 0 &&
        comments.map((comment) => {
          return (
            <Comment
              key={comment.comm_id}
              comment={comment}
              loadComments={loadComments}
            />
          );
        })}
    </div>
  );
};

export default Comments;
