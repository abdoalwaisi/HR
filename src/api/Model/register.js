const sql = require("../../Config/db");
const bcrypt = require("bcrypt");

async function register(
  name,
  salary = null,
  company_id = null,
  role_id = null,
  hire_date = null,
  username,
  password,
  phone_number
) {
  const hash = bcrypt.hashSync(password, 10);

  const employee = await sql`
INSERT INTO employees (name , salary , company_id , role_id , hire_date , username , password , phone_number)
VALUES (${name} , ${salary} , ${company_id} , ${role_id} , ${hire_date} ,${username} , ${hash} , ${phone_number})
RETURNING *;
`;
  return employee;
}

module.exports = { register };
