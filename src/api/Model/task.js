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
    SELECT * FROM tasks
    `;
  return tasks;
}

module.exports = {createTask , getAllTasks} ;
