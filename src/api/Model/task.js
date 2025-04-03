const sql = require("../../Config/db");

// status
// 0 in progress
// 1 done
// 2 cancelled

async function createTask(
  name,
  description,
  project_id,
  employee_id,
  deadline,
  created_at,
  status = 0
) {
  const task = await sql`
        INSERT INTO tasks (name , description , project_id , assigned_to , deadline , created_at , status)
        VALUES (${name},${description},${project_id},${employee_id},${deadline},${created_at},${status})
        RETURNING *
    `;
  return task;
}

async function getAllTasks() {
  const tasks = sql`
SELECT 
  tasks.name AS task_name ,
  tasks.description AS description,
  employees.name AS assigned_to,
  projects.name AS project_name ,
  departments.name AS department ,
  tasks.created_at AS created_at , 
  tasks.deadline AS deadline
from (((tasks 
INNER JOIN projects ON tasks.project_id = projects.id)
INNER JOIN employees ON tasks.assigned_to = employees.id)
INNER JOIN departments ON projects.department_id = departments.id)
    `;
  return tasks;
}

module.exports = { createTask, getAllTasks };
