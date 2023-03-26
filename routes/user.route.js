const { UserModel } = require("../model/user.model");

const express = require("express");
const UserRouter = express.Router();
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRouter = express.Router();

userRouter.post("/register", (req, res) => {
  const { name, email, pass } = req.body;

  try {
    bcrypt.hash(pass, 5, async function (err, hash) {
      // Store hash in your password DB.
      await UserModel.create({ name, email, pass: hash });
      res.status(200).send({ msg: "user created" });
    });
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    let user = await UserModel.findOne({ email });
    if (user) {
      let hash = await bcrypt.compare(pass, user.pass);
      if (!hash) {
        return res.status(401).send("incorrect password");
      } else {
        const token = jwt.sign(
          {
            _id: user._id,
            email: user.email,
          },
          "secret"
        );
        return res
          .status(200)
          .send({ token, user, message: "Login Successfully" });
      }
    }
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

module.exports = {
  userRouter,
};
