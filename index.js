require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.route");
const { noteRouter } = require("./routes/note.router");
const { isAuth } = require("./middleware/auth.middleware");

const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/users", userRouter);
app.use(isAuth);
app.use("/notes", noteRouter);
app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected");
  } catch (error) {
    console.log(error);
  }
});
