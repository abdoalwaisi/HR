const express = require("express");
const company = require("./src/api/Routes/company");
const register = require("./src/api/Routes/register");
const login = require("./src/api/Routes/login");
const employee = require("./src/api/Routes/employee");
const project = require("./src/api/Routes/project");
const role = require("./src/api/Routes/role");
const employeeProjects = require("./src/api/Routes/employee_projects");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/companies", company);
app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/employee", employee);
app.use("/api/project", project);
app.use("/api/role", role);
app.use("/api/employee_projects", employeeProjects);

app.listen(8080, () => {
  console.log("server is runing");
});
