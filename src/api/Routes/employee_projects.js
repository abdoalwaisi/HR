const express = require("express");
const rolecheck = require("../Helpers/accessControl");
const {
  assignEmployeeToProject,
  getEmployeesByProject,
  getProjectsByEmployee,
} = require("../Model/employee_projects");
const router = express.Router();

router.post("/", (req, res) => {
  const pass = rolecheck(["admin", "team lead"], req.user.role);
  if (!pass) return res.status(400).json("unauthorised");

  const { employee_id, project_id } = req.body;
  if ((!employee_id, !project_id)) {
    res.status(400).json({ msg: "missing info" });
  }

  try {
    const constraint = assignEmployeeToProject(employee_id, project_id);
    res.status(200).json(constraint);
  } catch (error) {
    if (error) res.status(500).json(error);
  }
});

router.get("/:employee_id", (req, res) => {
  const pass = rolecheck(["admin", "team lead", "manager"], req.user.role);
  if (!pass) return res.status(400).json("unauthorised");

  const employee_id = req.params.employee_id;
  if (!employee_id) {
    res.status(400).json({ msg: "missing info" });
  }
  try {
  } catch (error) {
    if (error) res.status(500).json(error);
  }
});

router.get("/:project_id", (req, res) => {
  const pass = rolecheck(["admin", "team lead", "manager"], req.user.role);
  if (!pass) return res.status(400).json("unauthorised");

  const project_id = req.params.project_id;
  if (!project_id) {
    res.status(400).json({ msg: "missing info" });
  }
  try {
  } catch (error) {
    if (error) res.status(500).json(error);
  }
});

module.exports = router;
