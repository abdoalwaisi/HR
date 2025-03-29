const express = require("express");
const { getAllRols, createRole } = require("../Model/role");

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const roles = await getAllRols();
    res.status(200).json(roles);
  } catch (error) {
    if (error) {
      res.status(500).json(error);
    }
  }
});

router.post("/", async (req, res) => {
  const { title, description, department_id } = req.body;
  if (!title) {
    return res.status(400).json({ msg: "missing info" });
  }
  try {
    const role = await createRole(title, null, department_id);
    res.status(200).json(role);
  } catch (error) {
    if (error) {
      return res.status(500).json(error);
    }
  }
});

module.exports = router;
