const express = require("express");
const app = express();
const cors = require("cors");
const contactRoutes = require('./routes/Contact');
const path = require('path');
require("dotenv").config();


app.use(express.json());
app.use(cors());

const db = require("./models");

//Routers
const userRouter = require("./routes/User");
app.use("/auth", userRouter);

const scoreRouter = require("./routes/Score");
app.use("/score", scoreRouter);

app.use('/contact', contactRoutes);

const phishingRouter = require("./routes/Phishing");
app.use("/phishing", phishingRouter);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT || 3001, () => {
    console.log("Server está a correr na porta 3001");
  });
});