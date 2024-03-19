const express = require("express");
const router = express.Router();

const { User } = require("../models");

router.get("/", async (req, res) => {
  const listOfPosts = await User.findAll();
  res.json(listOfPosts);
});

router.post("/", async (req, res) => {
  const post = req.body;
  await User.create(post);
  res.json(post);
});

module.exports = router;
