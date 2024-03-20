const express = require("express");
const router = express.Router();
const { User } = require("../models");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  const listOfPosts = await User.findAll();
  res.json(listOfPosts);
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      username: username,
      password: hash,
    });
    res.json("Utilizador criado com sucesso!");
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username: username } });
  if (!user) {
    return res.json({ error: "Utilizador não encontrado!" });
  }
  bcrypt.compare(password, user.password).then((match) => {
    if (!match) {
      return res.json({ error: "Password está incorreta!" });
    }
    res.json("Utilizador logado com sucesso!");
  });
});

module.exports = router;
