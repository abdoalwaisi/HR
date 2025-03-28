const express = require("express");
const { register } = require("../Model/register");

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, username, password, company_id, role_id } = req.body;
  if ((!name, !username, !password)) {
    return res
      .status(400)
      .json({ msg: "name and username and password required" });
  }
  try {
    const employee = await register(
      name,
      null,
      company_id,
      role_id,
      null,
      username,
      password,
      null
    );
    res.status(200).json(employee);
  } catch (error) {
    if (error) {
      res.status(400).json({ msg: error });
    }
  }
});

module.exports = router;
