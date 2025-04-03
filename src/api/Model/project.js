const sql = require("../../Config/db");

async function createNewProject(
  name,
  start_date = null,
  end_date = null,
  department_id = null,
  description = null
) {
  const project = await sql`
    INSERT INTO projects (name , start_date , end_date , department_id , description)
    VALUES (${name},${start_date},${end_date},${department_id},${description})
    RETURNING * ;
    `;
  return project;
}

async function getProjects(id) {
  const project = sql`
   SELECT *
   FROM projects
   WHERE id = ${id}
  `;
  return project;
}

module.exports = { createNewProject, getProjects };
