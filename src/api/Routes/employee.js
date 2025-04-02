const express = require("express");
const {
  getAllEmployees,
  getEmployeeById,
  getAllEmployeesFromDepartment,
  updateEmployeeInfo,
  deleteEmvployee,
} = require("../Model/employee");
const rolecheck = require("../Helpers/accessControl");
const Authentication = require("../Middlewares/Authentication");
const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const employees = await getAllEmployees();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/info", Authentication, async (req, res) => {
  const id = req.user.id;
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

router.get("/teemInfo", Authentication, async (req, res) => {
  const pass = rolecheck(["admin", "manager", "team lead"], req.user.role);
  if (!pass) return res.status(400).json("unauthorised");

  const department =
    req.user.role === "admin" ? req.body.department : req.user.department_name;

  if (!department) return res.status(400).json("missing info");

  try {
    const employees = await getAllEmployeesFromDepartment(department);
    res.status(200).json(employees);
  } catch (error) {
    if (error) {
      res.status(500).json({ error });
    }
  }
});

router.put("/update", Authentication, async (req, res) => {
  const pass = rolecheck(["admin", "manager", "team lead"], req.user.role);
  if (!pass) return res.status(400).json("unauthorised");

  const { name, salary, role_id, username, phone_number } = req.body;
  if (!username) return res.status(400).json("missing info");

  try {
    const employee = await updateEmployeeInfo(
      name,
      salary,
      role_id,
      null,
      username,
      phone_number
    );
    res.status(200).json(employee);
  } catch (error) {
    if (error) return res.status(500).json(error);
  }
});

router.delete("/", async (req, res) => {
  const pass = rolecheck(["admin", "manager", "team lead"], req.user.role);
  if (!pass) return res.status(400).json("unauthorised");

  const id = req.body.id;
  if (!id) res.status(400).json({ msg: "missing info" });

  try {
    const status = deleteEmvployee(id);
    res.status(200).json(status);
  } catch (error) {
    if (error) res.status(500).json(error);
  }
});

module.exports = router;
