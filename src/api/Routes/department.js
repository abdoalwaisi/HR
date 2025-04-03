const express = require("express");
const rolecheck = require("../Helpers/accessControl");
const Authentication = require("../Middlewares/Authentication");
const { createDepartment, getAllDepartment } = require("../Model/department");

const router = express.Router();

router.get("/all", Authentication, async (req, res) => {
  const pass = rolecheck(["admin"], req.user.role);
  if (!pass) return res.status(400).json("unauthorised");

  try {
    const departments = await getAllDepartment();
    res.status(200).json(departments);
  } catch (error) {
    if (error) {
      res.status(400).json(error);
    }
  }
});

router.post("/", Authentication, async (req, res) => {
  const pass = rolecheck(["admin"], req.user.role);
  if (!pass) return res.status(400).json("unauthorised");

  const { name, company_id } = req.body;
  if (!name || !company_id) {
    return res.status(400).json({ msg: "missing info" });
  }
  try {
    const department = await createDepartment(name, company_id);
    res.status(200).json(department);
  } catch (error) {
    if (error) {
      res.status(400).json(error);
    }
  }
});

module.exports = router;
