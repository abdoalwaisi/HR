const express = require("express");
const company = require("./src/api/Routes/company");
const register = require("./src/api/Routes/register");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/companies", company);
app.use("/api/register", register);

app.listen(8080, () => {
  console.log("server is runing");
});
