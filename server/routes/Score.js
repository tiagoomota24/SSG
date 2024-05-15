const express = require('express');
const router = express.Router();
const { validateToken } = require('../middlewares/AuthMiddleware');
const { Score, User } = require('../models'); 

router.post('/save-score', validateToken, async (req, res) => {
  // Verifique se o usuário está autenticado
  if (!req.user) {
    return res.status(401).send('Você precisa estar autenticado para salvar sua pontuação.');
  }

  // Obtenha os resultados do jogo do quiz do corpo do pedido
  const { time, score } = req.body;

  try {
    // Crie um novo registro na tabela Score
    const newScore = await Score.create({
      time: time,
      score: score,
      UserId: req.user.id 
    });

    // Envie uma resposta de sucesso
    res.status(200).send(newScore);
  } catch (error) {
    // Envie uma resposta de erro se algo der errado
    console.error('Erro ao salvar a pontuação:', error);
    res.status(500).send('Houve um erro ao salvar sua pontuação. Por favor, tente novamente mais tarde.');
  }
});

router.get('/get-scores', async (req, res) => {
  try {
    const scores = await Score.findAll({
      include: {
        model: User,
        attributes: ['username'],
      },
    });
    res.json(scores);
  } catch (error) {
    console.error('Erro ao buscar as pontuações:', error);
    res.status(500).send('Houve um erro ao buscar as pontuações. Por favor, tente novamente mais tarde.');
  }
});

router.get('/get-user-scores', validateToken, async (req, res) => {
  try {
    const scores = await Score.findAll({
      where: { UserId: req.user.id },
    });
    res.json(scores);
  } catch (error) {
    console.error('Erro ao buscar as pontuações do usuário:', error);
    res.status(500).send('Houve um erro ao buscar as pontuações do usuário. Por favor, tente novamente mais tarde.');
  }
});

module.exports = router;