const express = require("express");
const { createTask, getAllTasks } = require("../Model/task");

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const tasks = await getAllTasks();
    res.status(200).json(tasks)
  } catch (error) {
    if(error){
        res.status(500).json(error)
    }
  }
});

router.post("/", async (req, res) => {
  const { name, description, project_id, employee_id, status } = req.body;

  try {
    const task = await createTask(
      name,
      description,
      project_id,
      employee_id,
      null,
      null,
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
