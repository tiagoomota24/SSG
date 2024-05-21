const express = require("express");
const app = express();
const cors = require("cors");
const contactRoutes = require('./routes/Contact');


app.use(express.json());
app.use(cors());

const db = require("./models");

//Routers
const userRouter = require("./routes/User");
app.use("/auth", userRouter);

const scoreRouter = require("./routes/Score");
app.use("/score", scoreRouter);

app.use('/contact', contactRoutes);


db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server está a correr na porta 3001");
  });
});
