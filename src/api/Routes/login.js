const express = require("express");
const login = require("../Model/login");

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: "username and password is required" });
  }

  try {
    const token = await login(username, password);
    res.json({ accessToken: token });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = router;
