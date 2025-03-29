const sql = require("../../Config/db");

async function createDepartment(name, company_id) {
  const department = await sql`
    INSERT INTO departments ( name , company_id)
    VALUES (${name} , ${company_id})
        RETURNING * 
    `;
  return department;
}

async function getAllDepartment() {
  const department = await sql`
    SELECT * FROM departments
    `;
  return department;
}

module.exports = { createDepartment, getAllDepartment };
