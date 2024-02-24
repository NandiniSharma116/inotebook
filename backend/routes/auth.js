const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "Thisisajwt$token";
const fetchuser = require("../middleware/fetchUser");

//ROUTE 1 - Create a User using: POST "api/auth/createuser". Doesn't require auth.
//No Login require. This is used to create user
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name.").isLength({ min: 3 }),
    body("email", "Enter a valid email.").isEmail(),
    body("password", "Password must be of 8 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //If there are error, then return a bad request and the error
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    //Check whether the user with the same email exists already or not
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success, error: "User with the same email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      let secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      success = true;
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ success, authToken: authToken });

      // .then(user=>res.json(user))
      // .catch(err=>{console.log(err); res.json({error: "Please enter a unique username"})});
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ error: "There was an error while creating a user." });
    }
  }
);

//ROUTE 2 - Authentiate a user using GET: /api/auth/login

router.post(
  "/login",
  [
    body("email", "Enter a valid email.").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    //If there are error, then return a bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email: email });
      if (!user) {
        res
          .status(400)
          .json({ message: "Entered creadentials is wrong. Try Again!" });
      }
      const passCompare = bcrypt.compare(password, user.password);
      if (!passCompare) {
        res
          .status(400)
          .json({success: success, message: "Entered creadentials is wrong. Try Again!" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      success = true;
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ success: success, authToken: authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal error has occurred" });
    }
  }
);

// ROUTE 3 - Get logged in user details using POST: /api/auth/getuser
router.post(
  "/getuser",
  fetchuser,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal error has occurred" });
    }
  }
);
module.exports = router;
