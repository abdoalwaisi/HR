const sql = require("../../Config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function login(username, password) {
  const [user] = await sql`
      SELECT username, password FROM employees 
      WHERE username=${username}
    `;
  if (!user) {
    throw new Error("User not found");
  }
  const isMatch = bcrypt.compareSync(password, user.password);

  if (!isMatch) {
    throw new Error("password not match");
  }
  const token = jwt.sign({ username: user.username }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });

  return token;
}

module.exports = login;
