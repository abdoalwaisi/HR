const express = require("express");
const Authentication = require("../Middlewares/Authentication");
const rolecheck = require("../Helpers/accessControl");
const { getAllRols, createRole } = require("../Model/role");

const router = express.Router();

router.get("/all", Authentication, async (req, res) => {
  const pass = rolecheck(["admin"], req.user.role);
  if (!pass) return res.status(400).json("unauthorised");

  try {
    const roles = await getAllRols();
    res.status(200).json(roles);
  } catch (error) {
    if (error) {
      res.status(500).json(error);
    }
  }
});

router.post("/", Authentication, async (req, res) => {
  const pass = rolecheck(["admin"], req.user.role);
  if (!pass) return res.status(400).json("unauthorised");

  const { title, description, department_id } = req.body;
  if (!title) {
    return res.status(400).json({ msg: "missing info" });
  }
  try {
    const role = await createRole(title, description, department_id);
    res.status(200).json(role);
  } catch (error) {
    if (error) {
      return res.status(500).json(error);
    }
  }
});

module.exports = router;
