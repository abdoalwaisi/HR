const express = require("express");
const Authentication = require("../Middlewares/Authentication");
const rolecheck = require("../Helpers/accessControl");

const { createNewProject, getProjects } = require("../Model/project");

const router = express.Router();

router.get("/", (req, res) => {
  const pass = rolecheck(["admin", "manager"], req.user.role);
  if (!pass) return res.status(400).json("unauthorised");

  let departmentID =
    req.user.role === "admin" ? req.body.department_id : req.user.department_id;

  try {
    const allProjects = getProjects(departmentID);
    res.status(200).json(allProjects);
  } catch (error) {
    if (error) res.status(500).json(error);
  }
});

router.post("/", Authentication, async (req, res) => {
  const pass = rolecheck(["manager"], req.user.role);
  if (!pass) return res.status(400).json("unauthorised");

  const { name, department_id, description } = req.body;
  if (!name || !department_id) {
    res.status(400).json({ msg: "name is required" });
  }
  try {
    const project = await createNewProject(
      name,
      null,
      null,
      department_id,
      description
    );
    res.status(200).json(project);
  } catch (error) {
    if (error) {
      res.status(500).json(error);
    }
  }
});

module.exports = router;
