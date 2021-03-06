const authorize = require("../middleware/authorize");
const router = require("express").Router();
const pool = require("../db");

// -----> POSTS -----> //

// must check if user exists still??? ... if they have token and try to make requests then it will bug out... add later
// their token wiill still be valid/so they will be authorized but will there will be no more user with that id
// maybe just check in authorize if that user still exists...

// Gets all user info - name, email and their posts if they exist as well as anyone else's posts. Ordered by post time
router.get("/", authorize, async (req, res) => {
  try {
    // queries all posts and the given user information
    const userPosts = await pool.query(
      "SELECT u.user_name, u.user_email, u.user_id, p.post_id, p.description, p.post_time, p.user_id AS author FROM users AS u LEFT JOIN posts as p ON u.user_id = p.user_id OR u.user_id != p.user_id WHERE u.user_id = $1 ORDER BY p.post_time DESC",
      [req.user.id]
    );

    const posts = userPosts.rows.map((post) => {
      const author = post.author;
      const userId = post.user_id;
      delete post.author;
      delete post.user_id;
      if (author === userId) {
        return {
          ...post,
          owned: true,
        };
      } else {
        return {
          ...post,
          owned: false,
        };
      }
    });

    res.json(posts);
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

    res.json(true);
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

    if (deletePost.rows.length === 0) {
      return res.json("This post is not yours");
    }
    res.json("Success!");
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
      "UPDATE posts SET description = $1, post_time = LOCALTIMESTAMP WHERE post_id = $2 AND user_id = $3 RETURNING *",
      [description, id, req.user.id]
    );

    if (updatePost.rows.length === 0) {
      return res.json("This post is not yours");
    }
    res.json(true);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error!");
  }
});

// -----> COMMENTS -----> //

// get all comments on a given post and ordered by posttime (inverse)
router.get("/comments/post/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params; // post id
    const comments = await pool.query(
      "SELECT * FROM comments where post_id = $1 ORDER BY post_time ASC",
      [id]
    );
    const user = await pool.query(
      "SELECT user_id FROM users where user_id = $1",
      [req.user.id]
    );

    const refaComments = comments.rows.map((comment) => {
      const owner = comment.user_id;
      delete comment.user_id;

      if (owner === user.rows[0].user_id) {
        return {
          ...comment,
          owned: true,
        };
      } else {
        return {
          ...comment,
          owned: false,
        };
      }
    });

    res.json(refaComments);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error!");
  }
});

// add a comment to a given post
router.post("/comments/post/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params; // post id
    const { description } = req.body;
    const newComment = await pool.query(
      "INSERT INTO comments (user_id, post_id, description) VALUES ($1, $2, $3) RETURNING *",
      [req.user.id, id, description]
    );

    if (newComment.rows.length === 0) {
      return res.json("Error adding comment");
    }
    res.json(true);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error!");
  }
});

// delete a comment of current user
router.delete("/comments/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params; // comment id
    const deleteComment = await pool.query(
      "DELETE FROM comments WHERE comm_id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.id]
    );

    if (deleteComment.rows.length === 0) {
      return res.json("That comment does not belong to you!");
    }
    res.json(true);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error!");
  }
});

// update a comment of current user
router.put("/comments/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params; // comment id
    const { description } = req.body;
    const updateComment = await pool.query(
      "UPDATE comments SET description = $1 WHERE comm_id = $2 AND user_id = $3 RETURNING *",
      [description, id, req.user.id]
    );

    res.json(updateComment.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error!");
  }
});

// get rid of the returning * after testing

module.exports = router;
