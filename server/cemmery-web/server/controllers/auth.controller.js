const bcrypt = require("bcrypt");

const User = require("../models/user.model");

const authController = {
  //register
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      // create new User
      const newUser = await new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashed,
      });
      // save to database
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  loginUser: async (req, res) => {
    try {
      const email = await User.findOne({ email: req.body.email });
      if (!email) {
        return res.status(404).json("Wrong email");
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        email.password
      );
      if (!validPassword) {
        return res.status(404).json("Wrong password");
      }
      if (email && validPassword) {
        const { password, ...others } = email._doc;
        return res.status(200).json(others);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = authController;
