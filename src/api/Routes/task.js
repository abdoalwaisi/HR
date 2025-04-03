const express = require("express");
const rolecheck = require("../Helpers/accessControl");
const Authentication = require("../Middlewares/Authentication");
const { createTask, getAllTasks } = require("../Model/task");

const router = express.Router();

router.get("/all", Authentication, async (req, res) => {
  const pass = rolecheck(["admin", "manager", "team lead"], req.user.role);
  if (!pass) return res.status(400).json("unauthorised");

  try {
    const tasks = await getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    if (error) {
      res.status(500).json(error);
    }
  }
});

router.post("/", Authentication, async (req, res) => {
  const pass = rolecheck(["admin", "manager", "team lead"], req.user.role);
  if (!pass) return res.status(400).json("unauthorised");

  const {
    name,
    description,
    project_id,
    employee_id,
    status,
    deadline,
    created_at,
  } = req.body;

  try {
    const task = await createTask(
      name,
      description,
      project_id,
      employee_id,
      deadline,
      created_at,
      status
    );
    res.status(200).json(task);
  } catch (error) {
    if (error) {
      res.status(500).json(error);
    }
  }
});

module.exports = router;
