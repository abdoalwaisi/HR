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

module.exports = {
  getAllEmployees,
  getEmployeeById,
  getAllEmployeesFromDepartment,
};
