const sql = require("../../Config/db");

async function getAllRols() {
  const roles = await sql`
    SELECT * FROM roles
    `;
    return roles
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
