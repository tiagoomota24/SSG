const express = require("express");
const router = express.Router();
const { User } = require("../models");
const bcrypt = require("bcrypt");

const { sign } = require("jsonwebtoken");

router.post("/checkUsername", async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ where: { username: username } });
    res.json({ exists: !!user });
  } catch (error) {
    console.error("Error checking username:", error);
  }
});

router.post("/checkEmail", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email: email } });
    res.json({ exists: !!user });
  } catch (error) {
    console.error("Error checking email:", error);
  }
});

router.post("/", async (req, res) => {
  const { username, password, email } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      username: username,
      password: hash,
      email: email,
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
      return res.json({ error: "Utilizador ou palavra-passe incorreta!" });
    }

    const accessToken = sign(
      { username: user.username, id: user.id },
      "importantsecret"
    );

    res.json(accessToken);
  });
});

module.exports = router;
