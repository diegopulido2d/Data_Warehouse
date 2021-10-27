require("dotenv").config();

const createError = require("http-errors");

// Importacion de variables de entorno
const API_PORT = process.env.PORT || 3000;

const compression = require("compression");
const express = require("express");
const app = express();

// general config
app.set("env", process.env.ENVIRONMENT || "development");

//middleware
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");



app.use(morgan("dev"));

app.use(express.json(), compression(), cors());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

const UserRouter = require("./src/routers/user.router");
const RegionRouter = require("./src/routers/region.router");
const CountryRouter = require("./src/routers/country.router");
const CityRouter = require("./src/routers/city.router");
const ContactRouter = require("./src/routers/contact.router");
const CompanyRouter = require("./src/routers/company.router");
// const LocationRourter = require("./routers/location.router");


app.use("/users", UserRouter);
app.use("/regions", RegionRouter);
app.use("/countries", CountryRouter);
app.use("/cities", CityRouter);
app.use("/contacts", ContactRouter);
app.use("/companies", CompanyRouter);



/* ---------------------------------- GESTION DE ERRORES --------------------------------- */
//Endpoint not found error
app.use((req, res, next) => {
  console.log("Error 404: Endpoint not found");
  next(createError(404));
});

// Generic Error (MUST BE LAST)
app.use((err, req, res, next) => {
  //log error to console

  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  // res.render("pages/error");
  res.send({ status: "false", message:'server' ,data:err });
  // next();
});

/* ------------------------------- CONNECTION ------------------------------- */
app.listen(API_PORT, (err) => {
  if (err) console.log(err);
  console.log("Server listening on PORT:", API_PORT);
});
