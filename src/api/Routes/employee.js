const express = require("express");
const { getAllEmployees, getEmployeeById } = require("../Model/employee");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const employees = await getAllEmployees();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).jsonp({ msg: "id is required" });
  }
  try {
    const employees = await getEmployeeById(id);
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
