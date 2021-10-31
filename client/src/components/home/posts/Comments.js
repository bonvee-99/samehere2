import Comment from "./Comment";

const Comments = ({ comments, loadComments }) => {
  return (
    <div style={{ backgroundColor: "lightgreen" }}>
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
