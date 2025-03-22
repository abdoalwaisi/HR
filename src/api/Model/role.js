const sql = require("../../Config/db");

async function getAllRols() {
  const roles = await sql`
    SELECT * FROM roles
    `;
    return roles
}

async function createRole(title, description = null, departmant_id = null) {
  const role = await sql`
  INSERT INTO roles (title , description , department_id)
    VALUES (${title},${description},${departmant_id})\
    RETURNING *
    `;
  return role;
}

module.exports = { getAllRols, createRole };
