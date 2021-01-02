const express = require("express");
const path = require("path");
const http = require("http");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
var favicon = require("serve-favicon");
const postRouter = require("./routes/posts");

// const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.use(express.static(__dirname + "/static"));
app.use(favicon(__dirname + "/static/brand.png"));

const server = http.createServer(app);

// console.log(`mongodb://${process.env.USER}:${encodeURIComponent(process.env.PASS)}@${process.env.HOST}:${process.env.PORT}/${process.env.DB}`);

mongoose
  .connect(
    `mongodb://${process.env.DB_USER}:${encodeURIComponent(process.env.DB_PASS)}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB}`,
    { auth: { authdb:'stories' }, useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });
// mongoose
//   .connect("mongodb://localhost:27017/stories", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to local DB");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

app.use("/", postRouter);

server.listen(3000, () => {
  console.log(`Server started on port: ${3000}`);
});
