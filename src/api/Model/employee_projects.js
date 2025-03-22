const sql = require("../../Config/db");

async function assignEmployeeToProject(employee_id, project_id) {
  const constraint = await sql`
    INSERT INTO employee_projects (employee_id , project_id)
    VALUES (${employee_id} , ${project_id})
    RETURNING *
    `;

  return constraint;
}

async function getProjectsByEmployee(employee_id) {
  const projects = await sql`
        SELECT * FROM employee_projects 
        WHERE employee_id = ${employee_id}
    `;
  return projects;
}

async function getEmployeesByProject(project_id) {
  const employees = await sql`
        SELECT * FROM employee_projects 
        WHERE project_id = ${project_id}
    `;
  return employees;
}

module.exports = {assignEmployeeToProject , getEmployeesByProject , getProjectsByEmployee}