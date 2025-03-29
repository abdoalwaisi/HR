const express = require("express");
const {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompanyinfo,
  deleteCompany,
} = require("../Model/company");

const Authentication = require("../Middlewares/Authentication");

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

router.get("/", Authentication, async (req, res) => {
  try {
    const companies = await getAllCompanies();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  if (!id || !name) {
    res.status(400).json({ msg: "name and id is required" });
  }
  try {
    const company = await updateCompanyinfo(id, name);
    res.json(company);
  } catch (error) {
    if (error) {
      return res.status(500).json({ err: error.name });
    }
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

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await deleteCompany(id);
    res.status(200).json({ msg: "deleted successfully" });
  } catch (error) {
    res.status(500).jsonp({ msq: "err" });
  }
});

module.exports = router;
