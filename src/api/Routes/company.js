const express = require("express");
const {
  createCompany,
  getAllCompanies,
  getCompanyById,
} = require("../Model/company");

const router = express.Router();

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const company = await getCompanyById(id);
    res.json(company);
  } catch (error) {
    res.status(500).json({ err: error.name });
  }
});

router.get("/", async (req, res) => {
  try {
    const companies = await getAllCompanies();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/", async (req, res) => {
  const name = req.body.name;
  if (!name) {
    res.status(400).json({ err: "name is require" });
  }
  try {
    const user = await createCompany(name);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
