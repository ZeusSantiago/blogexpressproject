const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// GET / Home
router.get("", async (req, res) => {
  try {
    const locals = {
      title: "Node.js Blog",
      description: "simple blog created with node, express & mongodb",
    };
    let perPage = 10;
    let page = req.query.page || 1;

    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Post.countDocuments();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render("index", {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
    });
  } catch (error) {
    console.log(error);
  }
});

// GET / Post:id

router.get("/post/:id", async (req, res) => {
  try {
    let slug = req.params.id;
    const data = await Post.findById({ _id: slug });

    const locals = {
      title: data.title,
      description: "simple blog created with node, express & mongodb",
    };
    res.render("post", { locals, data });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

//INSER DATA
// function insertPostData() {
//   Post.insertMany([
//     {
//       title: "Blogzs",
//       body: "This is the body text",
//     },
//   ]);
// }
// insertPostData();

// Simple GET
// router.get("", async (req, res) => {
//   const locals = {
//     title: "Node.js Blog",
//     description: "simple blog created with node, express & mongodb",
//   };
//   try {
//     const data = await Post.find();
//     res.render("index", { locals, data });
//   } catch (error) {
//     console.log(error);
//   }
// });

//GET / POST - SearchBar
router.post("/search", async (req, res) => {
  try {
    const locals = {
      title: "Search",
      description: "simple blog created with node, express & mongodb",
    };
    let searchTerm = req.body.searchTerm || "";
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z ]/g, "");
    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });
    res.render("search", {
      data,
      locals,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;
