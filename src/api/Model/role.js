const sql = require("../../Config/db");

async function getAllRols() {
  const roles = await sql`
SELECT 
  employees.name AS employee_name,
  roles.title AS role_name,
  departments.name AS department_name,
  employees.username AS username
FROM ((roles
INNER JOIN departments ON departments.id = roles.department_id)
INNER JOIN employees ON employees.role_id = roles.id)
    `;
  return roles;
}

async function createRole(title, description = null, department_id) {
  const role = await sql`
  INSERT INTO roles (title , description , department_id)
    VALUES (${title},${description},${department_id})\
    RETURNING *
    `;
  return role;
}

module.exports = { getAllRols, createRole };
