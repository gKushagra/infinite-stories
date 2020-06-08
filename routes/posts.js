const express = require("express");
const router = express.Router();
const Post = require("./post-model");

// Show Add page
router.get("/add", (req, res) => {
  res.render("add", {
    pageTitle: "Editor",
  });
});

// Get the stored posts
router.get("/", (req, res) => {
  Post.find({}, (err, docs) => {
    if (!err) {
      if (docs) {
        res.render("index", {
          pageTitle: "Stories Infinity",
          docs,
        });
      }

      if (!docs) {
        res.render("index", {
          pageTitle: "Stories Infinity",
          message: "No posts found",
        });
      }
    }

    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
  });
});

// Store a new post
router.post("/", (req, res) => {
  //   console.log(req.body);
  if (!req.body.name && !req.body.name) {
    return res.render("add", {
      pageTitle: "Editor",
      message: "Enter name and your story! Its blank",
    });
  }

  const post = new Post({
    post: {
      name: req.body.name,
      text: req.body.editor,
    },
  });

  post.save().then((result) => {
    // console.log(result);

    Post.find({}, (err, docs) => {
      if (!err) {
        if (docs) {
          res.render("index", {
            pageTitle: "Stories Infinity",
            docs,
          });
        }
      }

      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
    });
  });
});

module.exports = router;
