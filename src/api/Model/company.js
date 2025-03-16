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

async function updateCompanyinfo(id, name) {
  const company = await sql`
  UPDATE companies SET name = ${name} WHERE id = ${id}
  RETURNING *;
  `;
  return company;
}

async function deleteCompany(id) {
  await sql`
    DELETE FROM companies WHERE id= ${id}
    `;
}

module.exports = {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompanyinfo,
  deleteCompany,
};
