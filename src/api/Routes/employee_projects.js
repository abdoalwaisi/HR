const express = require("express");
const {
  assignEmployeeToProject,
  getEmployeesByProject,
  getProjectsByEmployee,
} = require("../Model/employee_projects");
const router = express.Router();

router.post("/", (req, res) => {
  const { employee_id, project_id } = req.body;
  if ((!employee_id, !project_id)) {
    res.status(400).json({ msg: "missing info" });
  }

  try {
  } catch (error) {}
});

router.get("/:employee_id", (req, res) => {
  const employee_id = req.params.employee_id;
  if (!employee_id) {
    res.status(400).json({ msg: "missing info" });
  }
  try {
  } catch (error) {}
});

router.get("/:project_id", (req, res) => {
  const project_id = req.params.project_id;
  if (!project_id) {
    res.status(400).json({ msg: "missing info" });
  }
  try {
  } catch (error) {}
});

module.exports = router;
