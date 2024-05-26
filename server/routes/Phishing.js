const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware");
const { PhishingContent } = require("../models");

router.post("/phishingContent/:id", validateToken, async (req, res) => {
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: "Acesso negado" });
    }
    const { id } = req.params;
    const { intro, howItWorks, howToIdentify } = req.body;
    try {
      let content = await PhishingContent.findByPk(id);
      if (!content) {
        return res.status(404).json({ error: "Conteúdo não encontrado" });
      }
      content.intro = intro;
      content.howItWorks = howItWorks;
      content.howToIdentify = howToIdentify;
      await content.save();
      res.json(content);
    } catch (error) {
      console.error("Error saving content:", error);
      res.status(500).json({ error: "Erro ao salvar o conteúdo" });
    }
  });

router.get("/phishingContent/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const content = await PhishingContent.findByPk(id);
        if (!content) {
        return res.status(404).json({ error: "Conteúdo não encontrado" });
      }
      res.json(content);
    } catch (error) {
      console.error("Erro ao buscar conteúdo:", error);
      res.status(500).json({ error: "Erro ao obter o conteúdo" });
    }
  });

module.exports = router;
