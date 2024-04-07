const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const jwtSecret = "itsa32bitlongstring!!"
router.post(
  "/createuser",
  body("email", "Email is not valid").isEmail(),
  body("name", "Name is not Valid").isLength({ min: 5 }),
  body("password", "Password must be 5 character").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(15);
    const securedPassword = await bcrypt.hash(req.body.password , salt)
    try {
      await User.create({
        name: req.body.name,
        password: securedPassword,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginuser",
  body("email", "Email is not valid").isEmail(),
  body("password", "Password must be 5 character").isLength({ min: 5 }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const email = req.body.email;
    try {
      const userData = await User.findOne({ email });
      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Try logging in with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(req.body.password , userData.password)
      if (!passwordCompare) {
        return res.status(400).json({ errors: "Incorrect Password" });
      }

      const data = {
        user: {
          id:userData.id
        }
      }

      const authToken = jwt.sign(data , jwtSecret)

      return res.json({ success: true  , authToken : authToken});
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
