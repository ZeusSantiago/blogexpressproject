const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// GET / Home
router.get("", async (req, res) => {
  const locals = {
    title: "Node.js Blog",
    description: "simple blog created with node, express & mongodb",
  };
  try {
    const data = await Post.find();
    res.render("index", { locals, data });
  } catch (error) {
    console.log(error);
  }
});

router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;

// function insertPostData() {
//   Post.insertMany([
//     {
//       title: "Building a Blog",
//       body: "This is the body text",
//     },
//   ]);
// }
// insertPostData();
