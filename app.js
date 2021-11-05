const express = require("express");
const wordsRoutes = require("./routes/words");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(wordsRoutes);

app.listen(process.env.PORT || 3000);