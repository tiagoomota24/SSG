const express = require("express");
const router = express.Router();
const { User } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");

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

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

router.get("/userDetails", validateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id); // Encontrar o usuário pelo id
    if (!user) {
      return res.status(404).json({ error: "Utilizador não encontrado!" });
    }
    res.json(user);
  } catch (error) {
    console.error("Erro ao buscar detalhes do usuário:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

router.put('/changeEmail', validateToken, async (req, res) => {
  const { currentEmail, newEmail } = req.body;

  try {
    const currentUser = await User.findOne({ where: { id: req.user.id } });

    if (currentUser.email !== currentEmail) {
      return res.status(400).json({ error: 'O email atual não corresponde.' });
    }

    const emailExists = await User.findOne({ where: { email: newEmail } });

    if (emailExists) {
      return res.status(400).json({ error: 'O email já está em uso.' });
    }

    const user = await User.update(
      { email: newEmail },
      { where: { id: req.user.id } }
    );

    if (!user) {
      return res.status(404).json({ error: 'Utilizador não encontrado.' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocorreu um erro ao tentar alterar o email.' });
  }
});

router.put('/changePassword', validateToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const currentUser = await User.findOne({ where: { id: req.user.id } });

    // Verifique se a senha atual está correta
    const validPassword = await bcrypt.compare(currentPassword, currentUser.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'A senha atual está incorreta.' });
    }

    // Hash da nova senha antes de armazená-la
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Atualize a senha do usuário
    currentUser.password = hashedPassword;
    await currentUser.save();

    res.json({ message: 'Senha alterada com sucesso.' });
  } catch (error) {
    console.error("Erro ao alterar a senha:", error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
