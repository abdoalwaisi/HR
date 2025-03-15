const express = require("express");
const register = require("./src/api/Routes/company");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/companies", register);

app.listen(8080, () => {
  console.log("server is runing");
});

