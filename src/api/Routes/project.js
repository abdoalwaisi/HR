const express = require("express");
const { createNewProject, getProjects } = require("../Model/project");

const router = express.Router();

// router.get("/" , (req , res)= {

// } )

router.post("/", async (req, res) => {
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
