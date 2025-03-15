const sql = require("../../Config/db");

async function createCompany(name) {
  const user = await sql`
    INSERT INTO companies (
      name
    ) VALUES (
      ${name}
    )
    RETURNING *;
  `;
  return user;
}

async function getAllCompanies() {
  const companies = await sql`
  select * from companies
  `;
  return companies;
}

async function getCompanyById(id) {
  const company = await sql`
  select * from companies where id = ${id}
  `;
  return company;
}

module.exports = { createCompany, getAllCompanies, getCompanyById };
