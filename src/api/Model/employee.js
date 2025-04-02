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

async function getAllEmployeesFromDepartment(departmentName) {
  const employees = await sql`
select
  employees.name as name ,
  employees.id as employees_id,
  employees.phone_number as phone_number,
  roles.title as role,
  departments.name as department
from ((employees 
inner join roles on roles.id = employees.role_id)
inner join departments on departments.id = roles.department_id)
where departments.name = ${departmentName}
    `;
  return employees;
}

async function updateEmployeeInfo(
  name,
  salary = null,
  role_id = null,
  hire_date = null,
  username,
  phone_number = null
) {
  const employee = await sql`
  UPDATE  employees
  SET name = ${name} ,
   salary = ${salary} ,
   role_id = ${role_id} ,
   hire_date = ${hire_date} ,
   phone_number = ${phone_number}
   WHERE username = ${username}
   RETURNING *
  `;
  return employee;
}

async function deleteEmvployee(id) {
  const employee = await sql`DELETE FROM employees 
  WHERE id = ${id}
  `
  return {msg : "deleted"}
}

module.exports = {
  getAllEmployees,
  getEmployeeById,
  getAllEmployeesFromDepartment,
  updateEmployeeInfo,
  deleteEmvployee,
};
