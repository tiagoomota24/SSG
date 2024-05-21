const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Rota para lidar com as mensagens de contato
router.post('/contact', contactController.sendContactMessage);

module.exports = router;
