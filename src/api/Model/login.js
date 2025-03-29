const sql = require("../../Config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function login(username, password) {
  const [user] = await sql`
SELECT 
  employees.id AS employee_id,
  employees.username AS username,
  employees.password AS password,
	departments.name as department_name,
  roles.id AS role_id,
  roles.title AS role_title
FROM ((employees 
JOIN roles ON roles.id = employees.role_id)
JOIN departments ON roles.department_id = departments.id)
WHERE employees.username = ${username}
    `;

  if (!user) {
    throw new Error("User not found");
  }
  const isMatch = bcrypt.compareSync(password, user.password);

  if (!isMatch) {
    throw new Error("password not match");
  }
  console.log(user)
  const token = jwt.sign(
    {
      username: user.username,
      id: user.id,
      department_name: user.department_name,
      role: user.role_title,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );

  return token;
}

module.exports = login;
