const sql = require("../../Config/db");

async function getAllEmployees() {
  const employees = await sql`
    SELECT * FROM employees
    `;
  return employees;
}

async function getEmployeeById(id) {
  const employees = await sql`
    SELECT * FROM employees
    WHERE id=${id}
    `;
  return employees;
}

module.exports = { getAllEmployees, getEmployeeById };
