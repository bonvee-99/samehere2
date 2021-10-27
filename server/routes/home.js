const authorize = require("../middleware/authorize");
const router = require("express").Router();
const pool = require("../db");

// -----> POSTS -----> //

// Gets all user info - name, email and their posts if they exist as well as anyone else's posts. Ordered by post time
router.get("/", authorize, async (req, res) => {
  try {
    // queries all posts and the given user information
    const user = await pool.query(
      "SELECT u.user_name, u.user_email, p.post_id, p.description, p.post_time FROM users AS u LEFT JOIN posts as p ON u.user_id = p.user_id OR u.user_id != p.user_id where u.user_id = $1 ORDER BY p.post_time",
      [req.user.id]
    );

    res.json(user.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error!");
  }
});

// create a post
router.post("/posts", authorize, async (req, res) => {
  try {
    const { description } = req.body;
    const newPost = await pool.query(
      "INSERT INTO posts (user_id, description) VALUES ($1, $2) RETURNING *",
      [req.user.id, description]
    );

    res.json(newPost.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error!");
  }
});

// delete a post and all corresponding comments
router.delete("/posts/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const deletePost = await pool.query(
      "DELETE FROM posts WHERE post_id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.id]
    );

    res.json(deletePost.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error!");
  }
});

// updates a user's post to the new given text and updates the timestamp
router.put("/posts/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updatePost = await pool.query(
      "UPDATE posts SET description = $1, timestamp = LOCALTIMESTAMP WHERE todo_id = $2 AND user_id = $3 RETURNING *",
      [description, id, req.user.id]
    );

    res.json(updatePost.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// -----> COMMENTS -----> //

// get all comments on a given post and ordered by posttime
router.get("/comments", authorize, async (req, res) => {
  try {
    // left join of users on posts and their comments??? where comments.post_id = $1...
  } catch (error) {
    console.error(error.message);
  }
});

// add a comment
router.post("/comments/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params; // post id
    const { description } = req.body;
    const newComment = await pool.query(
      "INSERT INTO comments (user_id, post_id, description) RETURNING *",
      [req.user.id, id, description]
    );

    res.json(newComment.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// delete a comment of current user
router.delete("/comments/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params; // comment id
    const deleteComment = await pool.query(
      "DELETE FROM comments WHERE comment_id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.id]
    );

    res.json(deleteComment.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// update a comment of current user
router.put("/comments/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params; // comment id
    const { description } = req.body;
    const updateComment = await pool.query(
      "UPDATE comments SET description = $1 WHERE comment_id = $2 AND user_id = $3 RETURNING *",
      [description, id, req.user.id]
    );

    res.json(updateComment.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// get rid of the returning * after testing

module.exports = router;
