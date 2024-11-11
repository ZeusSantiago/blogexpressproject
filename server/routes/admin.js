const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");

const adminLayout = "../views/layouts/admin";
//GET / Admin - loginPage

router.get("/admin", async (req, res) => {
  try {
    const locals = {
      title: "Admin",
      description: "simple blog created with node, express & mongodb",
    };

    res.render("admin/index", { locals, layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});

//POST / Admin - Login Check
router.post("/admin", async (req, res) => {
  try {
    const { username, password } = req.body;

    res.redirect("/admin");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
